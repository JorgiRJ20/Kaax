import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';
import { getSolicitudDetalle, aceptarPostulacion, rechazarPostulacion } from '../api/ApiSolicitudDetalle';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';



export default function DetallePostulacion() {

  const { auth } = useAuth();
  const { idUser } = auth;
  //console.log(auth.token)
  let token = auth.token;
  //const role_user = auth.role;
  //console.log(auth.token);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const { params } = useRoute();
  const idPostulacion = params?.idPostulacion;

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [accionRealizada, setAccionRealizada] = useState(''); // Puede ser 'aceptar' o 'rechazar'


  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      return format(date, 'dd-MM-yyyy HH:mm');
    }
    return '';
  };

  const [data, setData] = useState({
    idPostulacion: '',
    tituloPublicacion: '',
    nombreUsuario: '',
    idLimpiador:'',
    userImage: '',
    email:'',
    phone:'',
    fechaPostulacion: '',
    comment: '',
  });


  useEffect(() => {
    getSolicitudDetalle(idPostulacion,config)
      .then((apiData) => {
        if (apiData.length > 0) {
          setData(apiData[0]);
        }
      })
      .catch((error) => {
        console.error('Error al recuperar datos de la API:', error);
      });
  }, []);

  const handleAceptar = async () => {
    
    try {
      await aceptarPostulacion(idPostulacion);
   
    } catch (error) {
      console.error('Error al aceptar la postulación:', error);
    }
  };

  const handleRechazar = async () => {
    try {
      await rechazarPostulacion(idPostulacion);
     
    } catch (error) {
      console.error('Error al rechazar la postulación:', error);
    }
  };

  const goPerfilDetail = () => {
    navigation.navigate("MiPerfil", {
      userId: data.idLimpiador,
      userName: data.nombreUsuario,
      userPhone: data.phone,
      userEmail: data.email,
      userPhoto: data.userImage
    })
    
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        <Text style={styles.title}>Responder solicitud</Text>

        <TouchableOpacity
          onPress={() => goPerfilDetail()}
          activeOpacity={0.5}
        >
          <Image source={{ uri: data.userImage }} style={styles.image} />
        </TouchableOpacity>

        <Text style={styles.subtitle}>Detalles de la solicitud:</Text>
        <View style={styles.ContainerStatus}>
          <Text style={styles.name}>
            <Icon name="user" size={24} style={styles.icon} /> Nombre: {data.nombreUsuario}
          </Text>
        </View>
        <View style={styles.ContainerStatus}>
          <Text style={styles.name}>
            <Icon name="calendar" size={24} style={styles.icon} /> Fecha postulación: {formatDate(data.fechaPostulacion)}
          </Text>
        </View>
        <View style={styles.ContainerComment}>
          <Text style={[styles.comment, styles.commentText]}>
            El usuario dice: {data.comment}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button, { backgroundColor: '#08A045' }]}
            onPress={() => {
            setAccionRealizada('aceptar');
            setModalVisible(true);
          }}
          >
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#E5383B' }]}
          onPress={() => {
          setAccionRealizada('rechazar');
          setModalVisible(true);
          }}
          > 
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>

       
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(false);
        }}
      >
      <View style={styles.modalContainer}>
      <Image
        source={require('../assets/postulacion.png')}
        style={styles.modalImage}
      />
        <Text style={styles.modalText}>
          {accionRealizada === 'aceptar'
            ? '¿Estás seguro de que deseas aceptar esta solicitud?'
            : '¿Estás seguro de que deseas rechazar esta solicitud?'}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#08A045' }]}
            onPress={() => {
          
            if (accionRealizada === 'aceptar') {
              aceptarPostulacion(data.idPostulacion, config); 
            } else {
              rechazarPostulacion(data.idPostulacion, config); 
            }
              setModalVisible(false);
              navigation.navigate('Tab');
              
            }}
            >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#E5383B' }]}
            onPress={() => {
            setModalVisible(false);
            }}
            >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
  );
}




    
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: '#F0F0F0',
            borderRadius: 8,
            marginVertical: 10,
            alignItems:'center'
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
            marginTop: 0,
            fontSize: 20,
            textAlign: 'center',
          },
          comment: {
            marginTop: 0,
            fontSize: 15,
            textAlign: 'center',
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
            borderRadius: 10,
            height:50,
            width:380,
            marginTop: 2,
            justifyContent:'center',
            
          },
          ContainerComment: {
            marginBottom: 8,
            backgroundColor:'#EEEBEB',
            borderRadius: 10,
            height:130,
            width:380,
            marginTop: 2,
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
          image:{
            width: 150,
            height: 150,
            borderRadius: 90, 
            borderWidth: 3, 
            borderColor: '#05668D', 
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
            fontSize:35,
            fontWeight:'bold',
            marginTop: -90,
            marginBottom: 20,
            color:'#05668D'
        },
        subtitle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 20,
          marginBottom: 10,
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
          buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          },
          button: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            marginHorizontal: 10,
          },
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          },
          modalText: {
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center',
          },
          modalImage: {
            width: 180, 
            height: 180, 
            resizeMode: 'contain', 
            marginBottom: 20, 
          },
          commentText: {
            lineHeight: 14, 
            textAlign: 'center', 
          },
         
         
         
    })