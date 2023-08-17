import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Card from '../components/SolicitudesCard';
import useAuth from '../hooks/useAuth';
import { getPostulaciones } from '../api/ApiSolicitud';
import Loader from '../components/Loader';

export default function Solicitudes() {
  const { auth } = useAuth();
  const { idUser } = auth;
  //console.log(auth.token)
  let token = auth.token;
  //const role_user = auth.role;
  //console.log(auth.token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (idUser) {
        //console.log(idUser)
        setLoading(true); 
        const data = await getPostulaciones(idUser,config);
        setSolicitudes(data);
        setLoading(false)
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idUser]);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
      >
        {solicitudes.map(solicitud => (
          <Card
            key={solicitud.idUsuarioPostulante}
            titulo={solicitud.titulo}
            descripcion={solicitud.descripcion}
            idUsuario={solicitud.idUsuarioPublicacion}
            nameUser={solicitud.nombreUsuarioPublicacion}
            precio={solicitud.pago}
            status={solicitud.status}
            idPostulacion={solicitud.idPostulacion}
            fechaTrabajo={solicitud.fechaTrabajo}
            horaTrabajo={solicitud.horaTrabajo}
            imagenUrl={solicitud.imagenUrl}
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


