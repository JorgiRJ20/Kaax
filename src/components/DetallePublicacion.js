import { View, Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,Alert, ScrollView} from 'react-native'
import React, {useEffect,useState,useCallback} from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuth from '../hooks/useAuth';
import { URL_API } from '../utils/enviroments';
import axios from 'axios';
import Palette from '../constants/Palette';
export default function DetallePublicacion(props) {

  const navigation = useNavigation();

  const goToPublicaciones = () => {
    navigation.navigate("Tab");
}

  const {route:{params}} = props


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

  const { auth } = useAuth();
        
let token = auth.token;
let idUser = auth.idUser;
const config = {
  headers: { Authorization: `Bearer ${token}` }
};



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
        Alert.alert(
            '¡Exito!',
            'Publicación Eliminada ',[
                {text: 'OK', onPress: goToPublicaciones},]
          );
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
  const RenderCardDataDetail = (icon, title, subtitle) => {
    const flex = params.is_location_available ? 0.5 : 1;
    return (
      <View style={{...styles.cardInfoDetail, flex: flex}}>
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
        
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.containerform}>
      <ScrollView style={{flex: 1}}>

      
      <Image source={require('../assets/departamento.jpg')} style={styles.imagen}/>
      <Text style={styles.title}>{params.titulo}</Text>
      <Text style={styles.descripcion}>{params.descripcion}</Text>
      <View
        style={styles.containerLineInfo}
      >
        {RenderCardDataDetail("money", "Pago", params.pago)}
        {params.is_location_available ? RenderCardDataDetail("arrows-h", "Distancia", `${params.locations_distance}`) : ""}
      </View>
      <View
        style={styles.containerLineInfo}
      >
        {RenderCardDataDetail("user", "Solicitante", params.user)}
        {RenderCardDataDetail("calendar", "Fecha de limpieza", `${params.fechaTrabajo} ${params.horaTrabajo}`)}
      </View>
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
        marginTop: 10,
        marginBottom: 10,
      },
      containerOptions: {
        alignItems: 'center'
      }

})