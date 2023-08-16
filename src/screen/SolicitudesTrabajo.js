import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import Loader from '../components/Loader'; // Asegúrate de importar el componente Loader desde la ubicación correcta
import Card from '../components/SolicitudesTrabajoCard';
import useAuth from '../hooks/useAuth';
import { getSolicitudes } from '../api/ApiSolicitudTrabajo';

export default function SolicitudesTrabajo() {
  const { auth } = useAuth();
  const { idUser } = auth;

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idUser) {
          const data = await getSolicitudes(idUser);
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

  return (
    <SafeAreaView style={styles.container}>
      <Loader show={loading} /> 
      <ScrollView contentContainerStyle={styles.cardContainer}>
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
          />
        ))}
      </ScrollView>
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
});


	
	
