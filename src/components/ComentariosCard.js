import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { URL_API } from '../utils/enviroments';

const Card = ({ text, additionalText }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{text}</Text>
      <Text style={styles.additionalText}>{additionalText}</Text>
    </View>
  );
};

const ComentariosCard = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    async function fetchComentarios() {
      try {
        const response = await axios.get(URL_API+'v1/comentarios');
        setComentarios(response.data);
      } catch (error) {
        console.error('Error fetching comentarios:', error);
      }
    }

    fetchComentarios();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.cardScrollView}>
        {comentarios.map((comentario) => (
          <Card key={comentario.id_comentario} text={comentario.fecha} additionalText={comentario.comentario} />
        ))}
      </ScrollView>
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
    alignItems: 'center', // Alinea las cards en la parte inferior
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
    width: 200, // Increase card width for longer text
    minHeight: 120, // Tamaño minimo
  },
  cardText: {
    fontSize: 18,
    marginBottom: 5,
    color:'#05668D',
    fontWeight:'600'
  },
  additionalText: {
    fontSize: 14,
    color: 'black',
  },
});

export default ComentariosCard;
