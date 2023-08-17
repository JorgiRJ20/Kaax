import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';
import { getDetallePostulacion } from '../api/ApiSolicitudDetalle';
import useAuth from '../hooks/useAuth';

export default function RespuestaAceptada() {
  const { auth } = useAuth();
  const { idUser } = auth;
  //console.log(auth.token)
  let token = auth.token;
  //const role_user = auth.role;
  //console.log(auth.token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { params } = useRoute();
  const idPostulacion = params?.idPostulacion;
  //console.log('is',idPostulacion)

  const [detallePostulacion, setDetallePostulacion] = useState(null);

  useEffect(() => {
    //console.log('Fetching details for idPostulacion:', idPostulacion);
    getDetallePostulacion(idPostulacion,config)
      .then((data) => {
        console.log('Details fetched:', data);
        setDetallePostulacion(data);
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
      });
  }, []);
 
  
  
  //console.log(detallePostulacion)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {detallePostulacion ? (
        <>
          <Text style={styles.title}>Tu solicitud ha sido aceptada. ¡Felicidades!</Text>
          <Image source={{ uri: detallePostulacion.userImage }} style={styles.image} />

          <Text style={styles.subtitle}>Detalles de la postulación:</Text>
          <View style={styles.ContainerStatus}>
            <Text style={styles.name}>
              <Icon name="user" size={24} style={styles.icon} /> Empleador: {detallePostulacion.nombreUsuario}
            </Text>
          </View>
          <View style={styles.ContainerStatus}>
            <Text style={styles.name}>
              <Icon name="calendar" size={24} style={styles.icon} /> Fecha trabajo:{' '}
              {detallePostulacion.fechaTrabajo}
            </Text>
          </View>
          <View style={styles.ContainerStatus}>
            <Text style={styles.name}>
              <Icon name="clock-o" size={24} style={styles.icon} /> HoraTrabajo:{' '}
              {detallePostulacion.horaTrabajo}
            </Text>
          </View>
          <View style={styles.ContainerStatus}>
            <Text style={styles.name}>
              Dirección: {detallePostulacion.direccion.calle}, {detallePostulacion.direccion.colonia},{' '}
              {detallePostulacion.direccion.municipio}, CP: {detallePostulacion.direccion.codigoPostal}
            </Text>
          </View>         
        </>
      ) : (
        <Text>Cargando detalles de la postulación...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
        textAlign: 'center',
        fontSize:35,
        fontWeight:'bold',
        marginTop: -85,
        marginBottom: 20,
        color:'#05668D'
    },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  ContainerStatus: {
    marginBottom: 8,
    backgroundColor:'#EEEBEB',
    borderRadius:'10',
    height:70,
    width:380,
    marginTop: 2,
    justifyContent:'center',
    
  },
  name: {
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image:{
    width: 150,
    height: 150,
    borderRadius: 90, 
    borderWidth: 3, 
    borderColor: '#05668D', 
  }
});
