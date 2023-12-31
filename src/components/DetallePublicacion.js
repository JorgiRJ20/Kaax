import { View, Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,Alert, ScrollView, Dimensions, FlatList} from 'react-native'
import React, {useEffect,useState,useCallback, useRef} from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuth from '../hooks/useAuth';
import { URL_API } from '../utils/enviroments';
import axios from 'axios';
import Palette from '../constants/Palette';
import Loader from './Loader';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('screen');

import { Modal } from 'react-native-paper';
export default function DetallePublicacion(props) {

  const [images, setImages] = useState([]);

  const [usersPostulantes, setUsersPostulantes] = useState([]);
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);

  const [message, setMessage] = React.useState("");
 const [visibleMod, setVisibleMod] = React.useState(false);
 const showModal = () => setVisibleMod(true);
 const hideModal = () => {setVisibleMod(false); goToPublicaciones();}

  const goToPublicaciones = () => {
    navigation.navigate("Tab");
}

  const {route:{params}} = props
  console.log(params)

  const goToEditarPub = () =>{
  navigation.navigate('EditarPublicacion',{idPublicacion:params.idPublicacion,
	titulo: params.titulo,
	descripcion: params.descripcion,
  numCuartos: params.numCuartos,
	pago: params.pago,
	fechaTrabajo: params.fechaTrabajo,
	horaTrabajo: params.horaTrabajo,
	status: params.status,
  direccion: params.direccion,
  nameDireccion: params.nameDireccion

  })}

  const getImagenes  = async () => {
    try {
      
      const response = await axios.get(URL_API+'imagenes',config);
      let imagenesFilterer = [];
      console.log(response.data)
      response.data.map((item) => {
          if(item.publicacion.idPublicacion == params.idPublicacion){
            console.log({idImage: item.idImagen, urlImage: item.imagenUrl})
              imagenesFilterer.push({idImage: item.idImagen, urlImage: item.imagenUrl})
          }
      })
      setImagesDetail(imagenesFilterer);
      console.log(imagenesFilterer, "imagenesFilterer")
  
    } catch (error) {
      console.error(error, "error asdasdasd");
    }
  }

  useEffect(() => {
    getImagenes();
  }, []);

  const { auth } = useAuth();
        console.log(getImagenes)
let token = auth.token;
let idUser = auth.idUser;
const config = {
  headers: { Authorization: `Bearer ${token}` }
};
  const [indexCarousel, setIndexCarousel] = useState(0);
  const flatListRef = useRef(null);
  const [imagesDetail, setImagesDetail] = useState([]);


const EliminarPub = async () => {
       try {
              await axios.put(URL_API+'v1/publicaciones/'+params.idPublicacion,{
                idPublicacion: params.idPublicacion,
                titulo: params.titulo,
                descripcion:params.descripcion,
                numCuartos:params.numCuartos,
                pago: params.pago,
                fechaTrabajo: params.fechaTrabajo,
                horaTrabajo: params.horaTrabajo,
                status: 0,
                user:{
                    idUser: idUser
                },
                direccion:{
                  idDireccion:params.direccion,
                }
            },config);
        } catch (error) {
            console.error(error);
        }
        setMessage("Publicación Eliminada");
        showModal();
}

  /**
 * Render de car para mostrar información de la publicación
 * @date 8/12/2023 - 8:27:18 PM
 * @author Alessandro Guevara
 *
 * @param {*} icon - nombre de icono
 * @param {*} title - titulo de la información que se va a mostrar
 * @param {*} subtitle - valor de la información
 * @returns {*}
 */
  const RenderCardDataDetail = ({icon, title, subtitle, isPress, handlePress}) => {
    const flex = params.is_location_available ? 0.5 : 1;
    return (
      <TouchableOpacity 
        style={{...styles.cardInfoDetail, flex: flex}}
        disabled={!isPress}
        onPress={handlePress}
        activeOpacity={0.5}
      >
        <View style={{ alignItems: 'center' }}>
          <View
            style={styles.circleContainer}
          >
            <Icon name={icon} color={Palette.colors.primary} size={34}/>
          </View>
        </View>
        
        <View style={styles.containerTextInfoDetail}>
          <Text style={styles.textTitleInfoDetail}>{title}</Text>
          <Text style={styles.subTitleTextInfoDetail}>{subtitle}</Text>
        </View>
        
      </TouchableOpacity>
    )
  }

  /**
   * Función para obtener los postulantes que tiene una publicación
   * @date 8/13/2023 - 5:28:08 PM
   * @author Alessandro Guevara
   *
   * @async
   * @returns {*}
   */
  const getPostulantesPublicacion = async () => {
    try {
        setShowLoader(true);
        const response = await axios.get(`${URL_API}postulaciones/getPostulantes/${params.idPublicacion}`,config);
        const array_users = [];
        // Verificamos si hay valores
        if(response.data.length > 0) {
          // Recorremos la respuesta y guardamos el id del usuario que realizo la postulación
          response.data.map((resp) => {
            array_users.push(resp[2].idUser);
          })
        }
        setUsersPostulantes(array_users);
    } catch (error) {
        console.error(error);
    }
    setShowLoader(false);
  }

  const handleShowImage = (url) => {
    navigation.navigate("ShowImages", {
        arrayImages: imagesDetail,
        indexShow: 1,
        howShow: 'onlyImage',
        uriUrl: url,
    });
  }

  const CarouselCardItem = ({ item, indexCar }) => {
    return (
      <View style={styles.containerItemCarousel}>

        <TouchableOpacity
            onPress={() => handleShowImage(item.urlImage)}
            activeOpacity={1}
        >
          <View style={{position: 'absolute', zIndex: 1000, right: 5, top: 5, backgroundColor: 'rgba(000, 000, 000, 0.2)', borderRadius: 50, paddingHorizontal: 4}}>
            <Text style={{color: Palette.colors.white}}>{(indexCarousel+1)}/{imagesDetail.length}</Text>
          </View>
          <Image
            source={{
              uri: item.urlImage,
            }}
            style={styles.imageItemCarousel}
          />
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * Función para obtener la cantidad de pixeles que se han recorrido scrolleando
   * y poder calcular en que indice esta el scroll dividiendo el ancho del componente
   * con la cantidad de pixeles recorridos
   * @date 8/16/2023 - 10:22:18 PM
   * @author Alessandro Guevara
   *
   * @param {*} event
   */
  const handleScroll = (event) => {
    // Obtenemos cuantos pixeles se han scrolleado en x (Horizontal)
    const offsetY = event.nativeEvent.contentOffset.x;
    // Ancho de nuestro componente en el flatlist
    const itemHeight = width-5;
    // Dividimos para obtener el scroll
    const indexScroll = (Math.floor(offsetY / itemHeight)) < 0 ? 0  :  (Math.floor(offsetY / itemHeight));
    setIndexCarousel(indexScroll);
  };

  const goPerfilDetail = () => {
    navigation.navigate("MiPerfil", {
      userId: params.userId,
      userName: params.user,
      userPhone: params.userPhone,
      userEmail: params.userEmail,
      userPhoto: params.userPhoto
    })
    
  }
 

  useEffect(() => {
    getPostulantesPublicacion();
  }, []);

  return (
    <SafeAreaView style={styles.containerform}>
      <Loader show={showLoader}/>
      <ScrollView style={{flex: 1}}>

      
      {/* <Image source={require('../assets/departamento.jpg')} style={styles.imagen}/> */}
      {/* <Swiper style={styles.wrapper} showsButtons={false} loop autoplay={true}>
      {images.map((imageUrl, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      ))}
    </Swiper> */}
      <View style={{ marginLeft: 0}}>
        <FlatList 
            style={{margin:0, padding: 0, left: 0}}
            ref={flatListRef}
            horizontal={true}
            bounces={true}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => CarouselCardItem(item)}
            data={imagesDetail}
            keyExtractor={(item) => item.idImage}
            decelerationRate={"fast"}
            snapToInterval={width}
            onScroll={handleScroll}
            
        />
      </View>
      <Text style={styles.title}>{params.titulo}</Text>
      <Text style={styles.descripcion}>{params.descripcion}</Text>
      <View
        style={styles.containerLineInfo}
      >
        <RenderCardDataDetail icon={"money"} title={"Pago"} subtitle={`$${params.pago}`} isPress={false}/>
        <RenderCardDataDetail icon={"home"} title={"cuartos"} subtitle={`${params.numCuartos}`} isPress={false}/>
      </View>
      <View
        style={styles.containerLineInfo}
      >
        <RenderCardDataDetail icon={"user"} title={"Solicitante"} subtitle={params.user} isPress={true} handlePress={goPerfilDetail}/>
        <RenderCardDataDetail icon={"calendar"} title={"Fecha de limpieza"} subtitle={`${params.fechaTrabajo} ${params.horaTrabajo}`} isPress={false} />
      </View>

      {usersPostulantes.length === 0 && (
        <View style={styles.containerOptions}>
          <TouchableOpacity style={styles.buttontime} onPress={goToEditarPub}>
          <Icon name="edit" color={'#fff'} size={22}/>
          <Text style={styles.buttonText}>Editar publicación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttontime} onPress={() => {EliminarPub();}}>
          <Icon name="trash" color={'#fff'} size={20}/>
          <Text style={styles.buttonText}>Eliminar publicación</Text>
          </TouchableOpacity>
        </View>
      )} 
      </ScrollView>
      <Modal visible={visibleMod} contentContainerStyle={styles.modal}>
						<View style={styles.modalResponse}>
							<Text style={styles.textProgress}>{message}</Text>
							<TouchableOpacity
							style={styles.aceptarbtn}
							onPress={() => hideModal()}
							>
								<Text style={styles.textaceptar}>Aceptar</Text>
							</TouchableOpacity>
						</View>
					</Modal>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
	containerform:{
      flex: 1,
      backgroundColor: '#F8F9FA',
	},
    imagen:{
        width: '100%',
        height: 170,
        resizeMode: 'cover',
        marginBottom: 10,
        marginTop:15,
    },
    title: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 8,
		color:'#05668D',
    textAlign: 'center'
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
      buttontime: {
        width: 220,
        height: 60,
        flexDirection:'row',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006E90',
        color: '#090808',
        marginTop: 15,
        alignItems: "center",
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginStart:10
      },
      circleContainer: {
        backgroundColor: '#EEEFFD', 
        width: 50, 
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 35,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: Palette.colors.primary,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 8,
      },
      cardInfoDetail: {
        flex: 0.5, 
        marginHorizontal: 4,
        backgroundColor: Palette.colors.white, 
        padding: 5,
        borderRadius: 25,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#557BF1',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 8,
      },
      containerTextInfoDetail: {
        justifyContent: 'center',
        alignItems: 'center', 
        marginTop: 12
      },
      textTitleInfoDetail: {
        color: Palette.colors.primary, 
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 15,
        marginBottom: 2,
        textAlign: 'center'
      },
      subTitleTextInfoDetail: {
        color: Palette.colors.black, 
        fontSize: 15, 
        fontStyle: 'italic',
        textAlign: 'center'
      },
      containerLineInfo: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: 10,
      },
      containerOptions: {
        alignItems: 'center'
      },  
      slide: {
        height: 200,
        width: '100%',
      },
      image: {
        width: '100%',
        height: '100%',
      },
      wrapper: {
        height: 200,
      },
      containerItemCarousel: {
          width: width, 
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowRadius: 1,
          elevation: 8,
      },
      imageItemCarousel: {
          height: 250,
          width: width,
          resizeMode: 'cover',
      },
      modal: {
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
      },
      textProgress: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#05668D",
        textAlign: "center",
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
      modalResponse: {
        textAlign: "center",
        backgroundColor: "white",
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
      },

})