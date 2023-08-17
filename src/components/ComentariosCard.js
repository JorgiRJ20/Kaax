import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import useAuth from '../hooks/useAuth';



const Card = ({ text, additionalText, imageUrl, fecha}) => {


  const { auth } = useAuth();
 
  let token = auth.token;
  const role_user = auth.role;
  console.log(auth);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  
  const calculateTimePassed = (timestamp) => {
    const currentDate = new Date();
    const commentDate = new Date(timestamp);
    const timeDiff = Math.abs(currentDate - commentDate);

    const yearsPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const monthsPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (yearsPassed >= 1) {
      return `Hace ${yearsPassed} año${yearsPassed !== 1 ? 's' : ''}`;
    } else if (monthsPassed >= 1) {
      return `Hace ${monthsPassed} mes${monthsPassed !== 1 ? 'es' : ''}`;
    } else {
      return `Hace ${daysPassed} día${daysPassed !== 1 ? 's' : ''}`;
    }
  };

 
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.cardImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.fecha}>{calculateTimePassed(fecha)}</Text>
        <Text style={styles.cardText}>{text}</Text>
        <Text style={styles.additionalText}>{additionalText}</Text>
      </View>
    </View>
  );
};

const ComentariosCard = () => {
  const { auth } = useAuth();
  const [comentarios, setComentarios] = useState([]);


  let token = auth.token;
  const role_user = auth.role;
  console.log(auth);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const fetchComentarios = async () => {
    if (auth.idUser) {
    try {
      const apiUrl = `v1/comentarios/receptor/${auth.idUser}`;
      console.log('ID de usuario:', auth.idUser);
      const response = await axios.get(URL_API+apiUrl, config);
      setComentarios(response.data);
    } catch (error) {
    
     
    }
  }
  };

  useEffect(() => {
    fetchComentarios();
    const intervalId = setInterval(fetchComentarios, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      {comentarios.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollView}>
          {comentarios.map((comentario) => (
            <Card
              key={comentario.idComentario}
              fecha={comentario.fecha}
              text={comentario.user.name}
              additionalText={comentario.comentario}
              imageUrl={comentario.user.userImage} 
            />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noCommentsText}>No hay comentarios disponibles</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  cardScrollView: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row', // Cambio en la dirección del diseño para colocar la imagen y el texto en fila
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: 200,
    minHeight: 120,
  },
  cardImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginRight: 10, // Espacio entre la imagen y el texto
    borderRadius:60
  },
  textContainer: {
    flex: 1, // El contenedor de texto ocupa el espacio restante
  },
  cardText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#05668D',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  fecha: {
    fontSize: 7,
    marginBottom: 5,
    color: '#05668D',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  additionalText: {
    fontSize: 14,
    color: 'black',
  },
  noCommentsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  date: {
    fontSize: 10,
    color: 'gray',

  },
 
});

export default ComentariosCard;
