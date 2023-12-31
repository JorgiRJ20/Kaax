import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../components/Loader'; 
import Card from '../components/SolicitudesTrabajoCard';
import useAuth from '../hooks/useAuth';
import { getSolicitudes } from '../api/ApiSolicitudTrabajo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SolicitudesTrabajo() {
  const { auth } = useAuth();
  const { idUser } = auth;
  let token = auth.token;
  //const role_user = auth.role;
  console.log(auth.token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [solicitudes, setSolicitudes] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (idUser) {
        setShowLoader(true);
        const data = await getSolicitudes(idUser, config);
        setSolicitudes(data);
        setShowLoader(false);
      }
    } catch (error) {
      setError(error);
      setShowLoader(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Loader show={showLoader}/>
      {solicitudes.length === 0 ? (
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay solicitudes por el momento.</Text>
      </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.cardContainer}
        >
        {solicitudes.map(solicitud => (
          <Card
            key={`${solicitud.idPublicacion}_${Math.random()}_${new Date().getTime()}`}
            titulo={solicitud.titulo}
            namePostulante={solicitud.nombreUsuarioPostulante}
            comment={solicitud.descripcion}
            fecha={solicitud.fechaPostulacion}
            status={solicitud.status}
            idPostulacion={solicitud.idPostulacion}
            fechaTrabajo={solicitud.fechaTrabajo}
            horaTrabajo={solicitud.horaTrabajo}
            userImage={solicitud.userImage}
            imagenUrl={solicitud.imagenUrl}
            />
        ))}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    cardContainer: {
      marginTop: 16,
      marginBottom: 130
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: '#888', 
    },
  });


	
	
