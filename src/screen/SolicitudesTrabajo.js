import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../components/SolicitudesTrabajoCard'
import useAuth from '../hooks/useAuth';
import { getSolicitudes } from '../api/ApiSolicitudTrabajo';


export default function SolicitudesTrabajo() {
	const { auth } = useAuth();
    const { idUser } = auth;
  //console.log('AUTHid', idUser);

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log(idUser)
        if (idUser) {
          const data = await getSolicitudes(idUser);
          setSolicitudes(data);
          //console.log(data)
          setLoading(false);
        }
      } catch (error) {
        //console.error('Error al obtener las postulaciones:', error);
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
  
  cardContainer: {
    marginTop: 16,
  },
});

	
	
