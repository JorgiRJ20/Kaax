import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment'; // Importa la biblioteca moment o date-fns
import useAuth from '../hooks/useAuth'; // Importa tu hook de autenticación
import { URL_API } from '../utils/enviroments'; // Importa la URL de tu API
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function Solicitud() {
	const route = useRoute();
	const params = route.params;
	const idPostulacion = params.idPostulacion;

	const { auth } = useAuth();
    const [rating, setRating] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
	const [postulacionData, setPostulacionData] = useState({});
	const [idUsuario, setIdUsuario] = useState(null);

	const [message, setMessage] = useState("");
	const [visible, setVisible] = useState(false);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);


	const navigation = useNavigation();
	const handlePress = () => {
	navigation.navigate('Publicaciones');
	};
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const apiUrl = `postulaciones/postulaciones/${idPostulacion}/datos`;
			const response = await axios.get(URL_API + apiUrl);
			setPostulacionData(response.data);
			setIdUsuario(response.data.idUsuario); // Guardar el idUsuario

			
			console.log('Data from API:', response.data); 
	  
		  } catch (error) {
			// console.error('Error fetching data:', error);
		  }
		};
	  
		fetchData();
	  }, []);


  // Función para manejar la selección de la calificación
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

	const enviarCalificacion = async () => {
		const fechaPostulacion = moment().format('YYYY-MM-DDTHH:mm:ss');
		console.log('idUser:', auth.idUser);
		console.log('rating:', rating);
		console.log('fecha:', fechaPostulacion);
		console.log('IdCalificado:', idUsuario);
	
	
		try {
		  const apiUrl = 'v1/calificaciones'; 
		  const response = await axios.post(`${URL_API}${apiUrl}`, {
			user: {idUser: auth.idUser},
			idCalificado: idUsuario, // AQUI QUIERO UTILIZAR EL IDUSUARIO
			calificacion: rating,
			fecha: fechaPostulacion,
		  });
	
		  console.log('Tu comentario y calificación enviados con éxito');
		  setModalVisible(true);
		} catch (error) {
		  
		}
	  };
	  
	 const enviarComentario = async () => {
     const fechaPostulacion = moment().format('YYYY-MM-DDTHH:mm:ss');
        console.log('idUser:', auth.idUser);
        console.log('comentario:', comment);
        console.log('fecha:', fechaPostulacion);

        try {
            const apiUrl = 'v1/comentarios';
            const response = await axios.post(`${URL_API}${apiUrl}`, {
                user: { idUser: auth.idUser },
                idReceptor: idUsuario, 
                comentario: comment,
                fecha: fechaPostulacion,
            });

            // Limpiar el campo de comentario y cerrar la hoja inferior
            setComment('');
        } catch (error) {
            // Manejar el error si es necesario
        }
    };


	const handleCommentChange = (text) => {
        setComment(text);
    };


	const bottomSheetRef = useRef(null);
	// variables snapoint avaible in bottom modal
   const snapPoints = useMemo(() => ["50%", "60%", "100%"]);
   const [currentSnapPoint, setCurrentSnapPoint] = useState(-1);
   // callbacks bottom modal
   const handleSheetChanges = useCallback((index) => {
	 setCurrentSnapPoint(index);
   }, []);
 
   const openBottomSheet = () => {
	 // bottomSheetRef.current?.expand(); // Expande la hoja inferior
	 setCurrentSnapPoint(0);
   };

   const closeBottomSheet = () => {
	bottomSheetRef.current?.close();
  };

   const renderBackdrop = useCallback(
	props => (
	  <BottomSheetBackdrop
		{...props}
		appearsOnIndex={0}
		disappearsOnIndex={-1}
		opacity={0.2}
	  />
	),
	[]
);

const enviarCalificacionYComentario = async () => {
	if (!comment) {
		setMessage("Para brindar una mejor experiencia, ayúdanos con una breve reseña!");
		showModal();
		return;
	}

	await enviarCalificacion();
	await enviarComentario();

	setTimeout(() => {
		setMessage("Tu reseña ya ha sido enviada!");
		showModal();
		// Aquí puedes cerrar el modal después de 1 segundo
		setTimeout(() => {
			hideModal();
			// También puedes cerrar la hoja inferior si es necesario
			closeBottomSheet();
		}, 1000);
	}, 500);
};


    return (
		
	<View style={{ flex: 2 }}>
	  <View style={styles.mainContainer}>
	  <View style={styles.containerSvg}>
		<View style={{marginTop:20}}>
				<Text style={styles.title}>¡Tu opinión es importante!</Text> 
		</View>
				<View>
				<Image
			 		source={{ uri: postulacionData.userImage }}
			 		style={{ width: 200, height: 200, borderRadius:130, borderWidth:10, borderColor:'#05668D'}}
		 		/>
				</View>
				
		 		<View style={{marginTop:20}}>
				 <View style={styles.ContainerStatus}>
				<Text style={styles.name}><Icon name="briefcase" size={24} style={styles.icon} /> {postulacionData.titulo}</Text>
				</View>
				<View style={styles.ContainerStatus}>
				<Text style={styles.name}><Icon name="user" size={24} style={styles.icon} /> {postulacionData.nombreUsuario}</Text>
				</View>
			</View>
			
			</View>
			
			<TouchableOpacity
            style={styles.aceptarbtn}
            onPress={openBottomSheet}> 
						
            <Text style={styles.textaceptar}>Calificar Servicio</Text>
            </TouchableOpacity>
			<BottomSheet
                    ref={bottomSheetRef}
                    index={currentSnapPoint}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.bottomModalContainer}>
					<Text style={styles.textoTitulo}>CALIFICAR</Text>
										<View style={styles.starsContainer}>
										{[1, 2, 3, 4, 5].map((item) => (
										<TouchableOpacity
											key={item}
											style={styles.starButton}
											onPress={() => handleRating(item)}
										>
											<FontAwesome
											name={item <= rating ? 'star' : 'star-o'}
											size={50}
											color={item <= rating ? '#ffc107' : '#bbb'}
											/>
										</TouchableOpacity>
										))}
									</View>
                        <Text style={styles.textoTitulo}>Escribe un comentario!</Text>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Escribe tu comentario aquí"
                            multiline
                            value={comment}
                            onChangeText={handleCommentChange}
                        />
                        <TouchableOpacity
                            style={styles.aceptarbtn}
                            onPress={enviarCalificacionYComentario}
						>
                            <Text style={styles.textaceptar}>Enviar</Text>
                        </TouchableOpacity>
						
						<Modal visible={visible} contentContainerStyle={styles.modal}>
						<View style={styles.modalResponse}>
						<Image
							source={require('../assets/departamento.jpg')} // Reemplaza con la URL de tu imagen
							style={{ width: 80, height: 80, borderRadius:130}}
						/>
							<Text style={styles.textProgress}>{message}</Text>
							<TouchableOpacity
							style={styles.aceptarbtn}
							onPress={() => hideModal()}
							>
								<Text style={styles.textaceptar}>Aceptar</Text>
							</TouchableOpacity>
						</View>
					</Modal>

				    </View>
                </BottomSheet>
      
    </View>
	</View>
			
	);		
      
}

const styles = StyleSheet.create({
    container: {
		padding: 10,
		backgroundColor: '#F0F0F0',
		borderRadius: 8,
		marginVertical: 10,
		alignItems:'center',
        justifyContent: 'center',
	  },
	  card: {
		width: 350,
		height: 55,
		marginVertical: 8,
		padding: 15,
		backgroundColor: '#f2f2f2',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		marginTop:2,
	  },
	  name: {
		fontSize: 20,
		textAlign: 'center',
		textTransform: 'uppercase',
		marginStart:0,
		color: '#8EA604',
		fontWeight:'800'
	  },
	  descripcion: {
		fontSize: 16,
		color: '#333',
	  },
	  titleNumero: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign:'center',
		top:0
		
	  },
	  ContainerStatus: {
		marginBottom: 8,
		backgroundColor:'#EEEBEB',
		borderRadius:'15',
		height:60,
		width:340,
		marginTop: 0,
		justifyContent:'center',
		
	  },
	  card: {
		backgroundColor: '#EEEBEB',
		borderRadius: 8,
		elevation: 4,
		marginVertical: 4,
		marginHorizontal: 2,
		flexDirection: 'row',
		alignItems: 'right',
		padding: 75,	
	  },
	  
	
	
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
	  cardImage: {
		width: 190,
		height: 190,
		
	  },
	  cardContent: {
		marginLeft: 16,
	  },
	  cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	  },
	  cardDescription: {
		fontSize: 14,
		color: '#888',
		marginTop: 4,
	  },
	  floatingButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		backgroundColor: '#8EA604',
		borderRadius: 50,
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
	  },
	  buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	  },
	  title:{
        textAlign: 'center',
        fontSize:30,
        fontWeight:'bold',
        marginBottom: 15,
        color:'#05668D'
    },	
	mainContainer: {
		backgroundColor: '#FFF',
		height: '100%',
	},
	containerSvg: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
        marginRight: 15,
        color: '#8EA604',
        fontSize: 20,
        fontWeight: 'bold',
		left:125
      },
	  aceptarbtn: {
        backgroundColor: "#05668D",
        padding: 15,
        width: "80%",
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center'
        },
		bottomModalContainer: {
			flex: 1,
			alignItems: 'flex-start',
			marginHorizontal: 10,
		},
		textoTitulo:{
			fontSize: 15,
			color: '#555',
			textAlign:'center',
			fontWeight:'600',
			color:'#05668D'
		  },
		  commentInput: {
			width: '100%',
			height: 100,
			borderWidth: 2,
			borderRadius: 10,
			padding: 10,
			marginTop: 10,
			backgroundColor:'#FFF',
			borderColor:'#05668D'
		  },
		  textaceptar: {
			fontSize: 20,
			fontWeight: "bold",
			color: "white",
			textAlign: "center",
			},
			starsContainer: {
				flexDirection: 'row'
			},
			  starButton: {
				padding: 8,
			  },

			  evaluatedContainer: {
				backgroundColor: '#8EA604',
				borderRadius: 20,
				padding: 15,
				marginTop: 20,
				alignSelf: 'center',
			},
			evaluatedText: {
				fontSize: 16,
				fontWeight: 'bold',
				color: 'white',
				textAlign: 'center',
			},
			modal: {
				alignContent: "center",
				alignSelf: "center",
				alignItems: "center",
				flex: 1,
				width: "90%",
				flexDirection:'row'
			},
			modalResponse: {
				textAlign: "center",
				backgroundColor: "white",
				alignItems: "center",
				padding: 20,
				borderRadius: 20,
			},
			textProgress:{
				marginTop:5
			}
     
})