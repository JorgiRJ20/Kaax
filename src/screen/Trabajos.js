import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { URL_API } from '../utils/enviroments';
import { differenceInDays, parseISO } from 'date-fns';

const TrabajosScreen = () => {
  const { auth } = useAuth();
  const [trabajosData, setTrabajosData] = useState([]);

  let token = auth.token;
  const role_user = auth.role;
  console.log(auth);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchTrabajosData();
    const interval = setInterval(fetchTrabajosData, 10000); // Actualizar cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const fetchTrabajosData = async () => {
    if (auth.idUser) {
      try {
        const apiUrl = `postulaciones/publicacion/status/${auth.idUser}`;
        const response = await axios.get(URL_API + apiUrl, config);
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

  const numeroDeTrabajos = trabajosData.length;

console.log(numeroDeTrabajos)

  return (
      <View style={styles.container}>
        {trabajosData.length === 0 ? (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>NO CUENTAS CON UN HISTORIAL</Text>
              <Text style={styles.message}>Busca oportunidades de trabajo</Text>
              <Text style={styles.message}>para comenzar a generar tu historial</Text>
              <Image  style={styles.fotoPerfil}
                      source={require('../assets/job-search.png')}
              />
            </View>
        ) : (
            trabajosData.map((trabajo, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.header}>HISTORIAL</Text>
                  <Image
                      source={{ uri: trabajo[6] }} // Reemplaza con la URL de tu imagen
                      style={styles.image}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>{trabajo[0]}</Text>
                    <Text style={styles.description}>{trabajo[1]}</Text>
                    <Text style={styles.info}>Contratante: {trabajo[5]}</Text>
                    <Text style={styles.info}>Pago: ${trabajo[6]}</Text>
                    <Text style={styles.info}>
                      Realizado hace {calculateDaysPassed(trabajo[10])} días
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Completado</Text>
                  </TouchableOpacity>
                </View>
            ))
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
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
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#777',
  },
  fotoPerfil: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
});

export default TrabajosScreen;
