import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Loader from '../components/Loader'; // Asegúrate de importar el componente Loader desde la ubicación correcta
import Card from '../components/SolicitudesTrabajoCard';
import useAuth from '../hooks/useAuth';
import { getSolicitudes } from '../api/ApiSolicitudTrabajo';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idUser) {
          const data = await getSolicitudes(idUser,config);
          setSolicitudes(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [idUser]);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      {solicitudes.length === 0 ? (
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay solicitudes por el momento.</Text>
      </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.cardContainer}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
        >
        {solicitudes.map(solicitud => (
          <Card
            key={solicitud.idPublicacion}
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
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: '#888', // Cambia el color del texto aquí
    },
  });


	
	
