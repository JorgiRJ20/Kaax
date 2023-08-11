import { View, Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,TouchableWithoutFeedback,TextInput,Modal} from 'react-native'
import React, {useEffect,useState,useCallback,useRef,useMemo} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from '@gorhom/bottom-sheet';
import {postularse} from '../../api/ApiPostulacion';
import useAuth  from '../../hooks/useAuth'
import moment from 'moment'; // Importa la biblioteca moment o date-fns



export default function DetallePublicacionLim(props) {

    const { auth } = useAuth(); // Obtén la información del usuario logueado
    const { idUser } = auth // Obtén en ID user
   

    const {navigation, route:{params}} = props
    //console.log('recuperamos id',params)
     // ref bottom modal
    const bottomSheetRef = useRef(null);
     // variables snapoint avaible in bottom modal
    const snapPoints = useMemo(() => ["40%", "60%", "100%"]);
    const [currentSnapPoint, setCurrentSnapPoint] = useState(-1);
    // callbacks bottom modal
    const handleSheetChanges = useCallback((index) => {
      setCurrentSnapPoint(index);
    }, []);
  
    const openBottomSheet = () => {
      bottomSheetRef.current?.expand(); // Expande la hoja inferior
    };

    const closeBottomSheet = () => {
      bottomSheetRef.current?.close(); // Cierra la hoja inferior
    };

    const [comment, setComment] = useState('');

    const handleCommentChange = (text) => {
        setComment(text);
    };
    //Modal de respuesta al dar clic en "enviar"
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
      setModalVisible(false);
      navigation.navigate('Solicitudes'); // Navega a la pantalla "Mis solicitudes"
    };

    //Para enviar comentario al postularme 
    const enviarComentario = async () => {
      const fechaPostulacion = moment().format('YYYY-MM-DDTHH:mm:ss');
      console.log('idUser:', idUser);
      console.log('idPublicacion:', params.idPublicacion);
      console.log('comment:', comment);
      console.log('fecha_postulacion:', fechaPostulacion);
      try {
        await postularse(idUser, params.idPublicacion, comment,fechaPostulacion,1);     
        // El comentario se envió correctamente, 
        console.log('Comentario enviado con éxito');
        // Mostrar el modal
        setModalVisible(true);
      } catch (error) {
        console.error('Error al enviar el comentario:', error);
        // Manejar el error si es necesario
      }
    };
  
  
    return (
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <SafeAreaView style={styles.containerform}>
            <Image source={require('../../assets/departamento.jpg')} style={styles.imagen}/>
              <Text style={styles.title}>{params.titulo}</Text>
                <Text style={styles.descripcion}>{params.descripcion}</Text>
                  <View style={styles.lineacard}>
                    <View style={styles.cards}>
                      <Icon name="money" color={'#05668D'} size={25}/>
                      <Text style={styles.texto}>${params.pago}</Text>
                    </View>
                    <View style={styles.cards}>
                      <Icon name="arrows-h" color={'#05668D'} size={25}/>
                      <Text style={styles.texto}>1.5KM</Text>
                    </View>
                  </View>
                  <View style={styles.lineacard}>
                    <View style={styles.cards}>
                      <Icon name="user" color={'#05668D'} size={25}/>
                      <Text style={styles.texto}>{params.user}</Text>            
                    </View>
                    <View style={styles.cards}>
                      <Icon name="calendar" color={'#05668D'} size={25}/>
                      <Text style={styles.texto}>{params.fechaTrabajo}</Text>
                      <Text style={styles.texto}>{params.horaTrabajo}</Text>
                    </View>
                  </View>
      
                  <TouchableOpacity
                      style={styles.aceptarbtn}
                      onPress={openBottomSheet} // Abre la hoja inferior cuando se presiona el botón
                  >
                    <Text style={styles.textaceptar}>Postularme</Text>
                  </TouchableOpacity>

                  <BottomSheet
                    ref={bottomSheetRef}
                    index={currentSnapPoint}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <View style={styles.bottomModalContainer}>
                        <Text style={styles.texto}>Escribir un comentario:</Text>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Escribe tu comentario aquí"
                            multiline
                            value={comment}
                            onChangeText={handleCommentChange}
                        />
                        <TouchableOpacity
                            style={styles.aceptarbtn}
                            onPress={enviarComentario}
                        >
                            <Text style={styles.textaceptar}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                  setModalVisible(!modalVisible);
                  }}
                >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>¡Postulación enviada con éxito!</Text>
                      <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </SafeAreaView>
            </TouchableWithoutFeedback>
      
    )
  }
  const styles = StyleSheet.create({
      containerform:{
        flex: 1, 
          backgroundColor: '#F8F9FA',
          alignItems:'center',
          justifyContent: 'center',
          paddingHorizontal:15,
      },
      imagen:{
          width: 370,
          height: 170,
          resizeMode: 'cover',
          marginBottom: 10,
          marginTop:15,
      },
      title: {
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 8,
          color:'#05668D'
        },
        descripcion: {
          fontSize: 18,
          textAlign: 'center',
          marginBottom: 8,
  
        },
        lineacard:{
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems:'center',
        },
        cards:{
          backgroundColor: '#fff',
          margin: 10,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: 150,
          height: 90,
          elevation: 10, 
          
        },
        texto:{
          fontSize: 15,
          color: '#555',
          textAlign:'center'
        },
        bottomModalContainer: {
          flex: 1,
          alignItems: 'flex-start',
          marginHorizontal: 10,
      },
      aceptarbtn: {
        backgroundColor: "#05668D",
        padding: 15,
        width: "80%",
        borderRadius: 20,
        marginTop: 20,
        },
        textaceptar: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        },
        commentInput: {
          width: '100%',
          height: 100,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
        },
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
        },
        modalText: {
          fontSize: 18,
          marginBottom: 20,
          textAlign: 'center',
        },
        modalButton: {
          backgroundColor: '#05668D',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        },
        modalButtonText: {
          color: 'white',
          fontSize: 16,
        },
        closeButtonText:{
          color: 'white',
        },
        
  
  })