import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Card from '../components/SolicitudesCard';
import useAuth  from '../hooks/useAuth';
import { getPostulaciones } from '../api/ApiSolicitud';

export default function Solicitudes() {
  const { auth } = useAuth();
  const { idUser } = auth;
  console.log('AUTHid', idUser);

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(idUser)
        if (idUser) {
          const data = await getPostulaciones(idUser);
          setSolicitudes(data);
          console.log(data)
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener las postulaciones:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [idUser]);

  
  

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
      {console.log('solicitudes:', solicitudes)}
        {solicitudes.map(solicitud => (
          <Card
            key={solicitud.idUsuarioPostulante}
            titulo={solicitud.titulo}
            descripcion={solicitud.descripcion}
            idUsuario={solicitud.idUsuarioPublicacion}
            nameUser={solicitud.nombreUsuarioPublicacion}
            precio={solicitud.pago}
            status={solicitud.status}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  cardContainer: {
    marginTop: 16,
  },
});

