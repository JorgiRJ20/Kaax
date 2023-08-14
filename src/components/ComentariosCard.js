import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import useAuth from '../hooks/useAuth';

const Card = ({ text, additionalText }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{text}</Text>
      <Text style={styles.additionalText}>{additionalText}</Text>
    </View>
  );
};

const ComentariosCard = () => {
  const { auth } = useAuth();
  const [comentarios, setComentarios] = useState([]);

  const fetchComentarios = async () => {
    try {
      const apiUrl = `v1/comentarios/receptor/${auth.idUser}`;
      console.log('ID de usuario:', auth.idUser);
      const response = await axios.get(URL_API + apiUrl);
      setComentarios(response.data);
    } catch (error) {
      console.error('Error fetching comentarios:', error);
      setComentarios([]); // Vacía los comentarios en caso de error
    }
  };

  useEffect(() => {
    fetchComentarios();
    const intervalId = setInterval(fetchComentarios, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      {comentarios.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={styles.cardScrollView}>
          {comentarios.map((comentario) => (
            <Card
              key={comentario.idComentario}
              text={comentario.user.name}
              additionalText={comentario.comentario}
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
  cardText: {
    fontSize: 18,
    marginBottom: 5,
    color:'#05668D',
    fontWeight:'600',
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
});

export default ComentariosCard;
