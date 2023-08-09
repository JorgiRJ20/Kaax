import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../components/SolicitudesCard';
import { getSolicitudes } from '../api/ApiSolicitud';

export default function Solicitudes(props) {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    // Llamar a la función de la API cuando el componente se monte
    getSolicitudes()
	.then(data => {
        console.log('Datos de la API:', data); // Agrega este console.log para verificar los datos obtenidos
        setSolicitudes(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {solicitudes.map(solicitud => (
          <Card
            key={solicitud.idPublicacion}
            titulo={solicitud.titulo}
            descripcion={solicitud.descripcion}
            idUsuario={solicitud.idUsuario}
            nameUser={solicitud.nameUser}
			precio={solicitud.precio}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
});
