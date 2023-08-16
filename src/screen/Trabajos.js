import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { URL_API } from '../utils/enviroments';
import { differenceInDays, parseISO } from 'date-fns';

const TrabajosScreen = () => {
  const { auth } = useAuth();
  const [trabajosData, setTrabajosData] = useState([]);

  useEffect(() => {
    fetchTrabajosData();
    const interval = setInterval(fetchTrabajosData, 10000); // Actualizar cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const fetchTrabajosData = async () => {
    if (auth.idUser) {
    try {
      const apiUrl = `postulaciones/publicacion/status/${auth.idUser}`;
      const response = await axios.get(URL_API+apiUrl);
      setTrabajosData(response.data);
    } catch (error) {
     // console.error('Error al obtener los trabajos:', error);
    }
  }
  };

  const calculateDaysPassed = (workDate) => {
    const currentDate = new Date();
    const workDateParsed = parseISO(workDate);
    const daysPassed = differenceInDays(currentDate, workDateParsed);
    return daysPassed;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HISTORIAL</Text>
      {trabajosData.map((trabajo, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={require('../assets/departamento.jpg')} // Reemplaza con la URL de tu imagen
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{trabajo[0]}</Text>
            <Text style={styles.description}>{trabajo[1]}</Text>
            <Text style={styles.info}>Contratante: {trabajo[5]}</Text>
            <Text style={styles.info}>Pago: ${trabajo[6]}</Text>
            <Text style={styles.info}>Realizado hace {calculateDaysPassed(trabajo[10])} días</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Completado</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
    alignItems:'center'
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#05668D',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  info: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    padding: 15,
    backgroundColor: '#8EA604',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TrabajosScreen;
