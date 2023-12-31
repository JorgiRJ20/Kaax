import { View, Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,TouchableWithoutFeedback,TextInput,Modal, Dimensions, FlatList} from 'react-native'
import React, {useEffect,useState,useCallback,useRef,useMemo} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {postularse} from '../../api/ApiPostulacion';
import useAuth  from '../../hooks/useAuth'
import moment from 'moment'; // Importa la biblioteca moment o date-fns
import Palette from '../../constants/Palette';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { URL_API } from '../../utils/enviroments';
import Loader from './../Loader';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');



export default function DetallePublicacionLim(props) {

    const { auth } = useAuth(); // Obtén la información del usuario logueado
    const { idUser, token } = auth; // Obtén en ID user
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const [usersPostulantes, setUsersPostulantes] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    

    const {route:{params}} = props
    const navigation = useNavigation();
    const goToSolicitudes = () => {
    navigation.navigate('Tab');
     };
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
      // bottomSheetRef.current?.expand(); // Expande la hoja inferior
      setCurrentSnapPoint(0);
    };

    const closeBottomSheet = () => {
      bottomSheetRef.current?.close(); // Cierra la hoja inferior
    };

    const [indexCarousel, setIndexCarousel] = useState(0);
    const flatListRef = useRef(null);
    const [imagesDetail, setImagesDetail] = useState([]);

    /**
     * Componente para mostrar como fondo cuando el BottomSheet se muestre
     * @date 8/12/2023 - 8:28:13 PM
     * @author Alessandro Guevara
     *
     */
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

    const [comment, setComment] = useState('');

    const handleCommentChange = (text) => {
        setComment(text);
    };
    //Modal de respuesta al dar clic en "enviar"
    const [modalVisible, setModalVisible] = useState(false);

    

    //Para enviar comentario al postularme 
    const enviarComentario = async () => {
      const fechaPostulacion = moment().format('YYYY-MM-DDTHH:mm:ss');
      //console.log('idUser:', idUser);
      //console.log('idPublicacion:', params.idPublicacion);
      //console.log('comment:', comment);
      //console.log('fecha_postulacion:', fechaPostulacion);
      try {
        await postularse(idUser, params.idPublicacion, comment,fechaPostulacion,1,config);     
        // El comentario se envió correctamente, 
        console.log('Comentario enviado con éxito');
        // Mostrar el modal
        setModalVisible(true);
      } catch (error) {
        console.error('Error al enviar el comentario:', error);
        // Manejar el error si es necesario
      }
    };

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
      const flex = icon != "calendar" ? 0.5 : 1;
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
    getImagenes();
  }, []);
  
    return (
          <SafeAreaView style={styles.containerform}>
            <Loader show={showLoader} />
            <ScrollView style={{flex: 1}}>
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
                  {params.is_location_available && (
                    <RenderCardDataDetail icon={"arrows-h"} title={"Distancia"} subtitle={`${params.locations_distance}`} isPress={false}/>
                  )}
                </View>
                <View
                  style={styles.containerLineInfo}
                >
                  <RenderCardDataDetail icon={"calendar"} title={"Fecha de limpieza"} subtitle={`${params.fechaTrabajo} ${params.horaTrabajo}`} isPress={false} />
                </View>
                
                  {/* Verificamos si el usuario actual esta dentro de los usuarios postulantes de la publicación */}
                  {usersPostulantes.includes(idUser) === false && (
                    <TouchableOpacity
                        style={styles.aceptarbtn}
                        onPress={openBottomSheet} // Abre la hoja inferior cuando se presiona el botón
                    >
                      <Text style={styles.textaceptar}>Postularme</Text>
                    </TouchableOpacity>
                  )}
                  

                  <BottomSheet
                    ref={bottomSheetRef}
                    index={currentSnapPoint}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backdropComponent={renderBackdrop}
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
                      <TouchableOpacity style={styles.modalButton} onPress={goToSolicitudes}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </ScrollView>
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
          flex: 1,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems:'center',
        },
        cards:{
          flex: 0.5,
          backgroundColor: '#fff',
          margin: 10,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
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
        alignSelf: 'center'
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
          marginTop: 10,
          marginBottom: 10,
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
        
  
  })