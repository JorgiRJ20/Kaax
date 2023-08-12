import { View, Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,Alert} from 'react-native'
import React, {useEffect,useState,useCallback} from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuth from '../hooks/useAuth';
import { URL_API } from '../utils/enviroments';
import axios from 'axios';
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
  direccion: params.direccion
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

  return (
    <SafeAreaView style={styles.containerform}>
        <Image source={require('../assets/departamento.jpg')} style={styles.imagen}/>
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
    <TouchableOpacity style={styles.buttontime} onPress={goToEditarPub}>
            <Icon name="edit" color={'#fff'} size={22}/>
			      <Text style={styles.buttonText}>Editar publicación</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttontime} onPress={() => {EliminarPub();}}>
            <Icon name="trash" color={'#fff'} size={20}/>
			      <Text style={styles.buttonText}>Eliminar publicación</Text>
            </TouchableOpacity>
    
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
	containerform:{
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

})