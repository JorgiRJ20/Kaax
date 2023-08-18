import React,{useEffect,useState,useCallback} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../components/SolicitudesCard';
import useAuth from '../hooks/useAuth';
import { getPostulaciones } from '../api/ApiSolicitud';
import Loader from '../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Solicitudes() {
  const { auth } = useAuth();
  const { idUser } = auth;
  // console.log(auth.token)
  let token = auth.token;
  // const role_user = auth.role;
  // console.log(auth.token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [solicitudes, setSolicitudes] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (idUser) {
        // console.log(idUser)
        setShowLoader(true);
        const data = await getPostulaciones(idUser, config);
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
          {solicitudes.map((solicitud) => (
            <Card
              key={`${solicitud.idUsuarioPostulante}_${Math.random()}_${new Date().getTime()}`}
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
    paddingBottom: 130
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});



