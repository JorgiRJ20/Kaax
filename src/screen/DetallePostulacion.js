import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getSolicitudDetalle } from '../api/ApiSolicitudDetalle';
import useAuth from '../hooks/useAuth';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';

export default function DetallePostulacion() {
    const { auth } = useAuth();
    const { idUser } = auth;

    const { params } = useRoute();
    const idPostulacion = params?.idPostulacion;
    console.log('recuperamos id',idPostulacion)

    const formatDate = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            return format(date, 'dd-MM-yyyy'); // Formato 'dd-MM-yyyy'
        }
        return '';
    };

    const [data, setData] = useState({
        idPostulacion: '',
        tituloPublicacion: '',
        nombreUsuario: '',
        userImage: '',
        fechaPostulacion: '',
        comment: '',
    });

    useEffect(() => {
        // Llamada a la función getSolicitudes y actualización del estado 'data'
        getSolicitudDetalle(idPostulacion)
            .then(apiData => {
                if (apiData.length > 0) {
                    setData(apiData[0]);
                }
            })
            .catch(error => {
                console.error('Error al recuperar datos de la API:', error);
            });
    }, []);

    return (
        <View style={{ flex: 2 }}>
            {/* Resto de tu JSX */}
            <View style={styles.containerSvg}>
                <Text style={styles.title}>Responder solicitud</Text>
                <Image
                    source={require('../assets/kaaxCheck.png')}
                    style={{ width: 180, height: 180, top: -60, left: 8 }}
                />

                <Text style={styles.subtitle}>{data.titulo}</Text>
                <View style={styles.ContainerStatus}>
                    <Text style={styles.name}><Icon name="user" size={24} style={styles.icon} /> {data.nombreUsuario}</Text>
                </View>
                <View style={styles.ContainerStatus}>
                    <Text style={styles.name}><Icon name="calendar" size={24} style={styles.icon} /> {formatDate(data.fechaPostulacion)}</Text>
                </View>
                <View style={styles.ContainerStatus}>
                    <Text style={styles.name}><Icon name="calendar" size={24} style={styles.icon} /> {data.comment}</Text>
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#08A045' }]}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#E5383B' }]}>
                    <Text style={styles.buttonText}>Rechazar</Text>
                </TouchableOpacity>
        </View>
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
            borderRadius:'10',
            height:50,
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
            fontSize:40,
            fontWeight:'bold',
            marginTop: 5,
            marginBottom: 45,
            marginTop:20,
            color:'#05668D'
        },
        subtitle:{
            textAlign: 'center',
            fontSize:28,
            fontWeight:'bold',
            marginTop: -80,
            marginBottom: 10, 
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
         
         
         
    })