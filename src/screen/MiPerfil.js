import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ComentariosCard from '../components/ComentariosCard';
import useAuth from '../hooks/useAuth';
import { URL_API } from '../utils/enviroments';
import axios from 'axios';
import { ROLE_LIMPIADOR, ROLE_SOLICITANTE } from '../utils/enviroments';
import { useNavigation } from '@react-navigation/native';

export default function MiPerfil(props) {

  const {userId, userEmail, userName, userPhone, userPhoto} = props.route.params
  const navigation = useNavigation();
  console.log("userId, userEmail, userName, userPhone, userPhoto")
  console.log(userId, userEmail, userName, userPhone, userPhoto)
    const handlePress = () => {
	navigation.navigate('Trabajos');
	};

  const [rating, setRating] = useState();
    const auth = useAuth();
    const { role } = auth.auth;
    console.log(role);

  let token = auth.auth.token;
  const role_user = auth.role;
  console.log(auth);

  const user_id = auth.auth.idUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const fetchPromedio = async () => {
    console.log(auth);
    if (userId) {
      try {
        const apiUrl = `v1/calificaciones/promedio/${userId}`;
        console.log('ID de usuario:', auth.auth.idUser);
        const response = await axios.get(URL_API+apiUrl, config);
        setRating(response.data);

        console.log(response.data);
        console.log(config);
      } catch (error) {
      //  console.error('Error al obtener el promedio:', error);
      }
    }
  };

  useEffect(() => {
    fetchPromedio();

    const pollingInterval = setInterval(fetchPromedio, 5000); // Actualizarse cada 10 segundos

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.fotoPerfil} source={{ uri: userPhoto }} />
      <Text style={styles.title}>{userName}</Text>
      <View style={styles.starsContainer}>
  {[1, 2, 3, 4, 5].map((item) => (
    <TouchableOpacity
      key={item}
      disabled // Deshabilita la interacción
      activeOpacity={1} // Cambiar opacidad
    >
      <FontAwesome
        name={
          item <= rating
            ? 'star'
            : item - 0.5 <= rating
            ? 'star-half-full'
            : 'star-o'
        }
        size={40}
        color="#ffc107" // Siempre amarillo para estrellas seleccionadas
      />
    </TouchableOpacity>
  ))}
</View>
      {user_id === userId && role === ROLE_LIMPIADOR && (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.input2}>
          <FontAwesome style={styles.icono2} name="folder" />
          <Text style={styles.inputText2}>  Trabajos</Text>
        </View>
      </TouchableOpacity>
            )}
      <View style={styles.input}>
        <FontAwesome style={styles.icono} name="phone" />
        <Text style={styles.inputText}>  {userPhone}</Text>
      </View>
      <View style={styles.input}>
        <FontAwesome style={styles.icono} name="envelope" />
        <Text style={styles.inputText}>   {userEmail}</Text>
      </View>
      <ComentariosCard userId={userId}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
  },
  fotoPerfil: {
    width: 200,
    height: 200,
    borderColor: '#ececee',
    borderWidth: 10,
    borderRadius: 180,
    marginTop: 50,
  },
  input: {
    height: 50,
    margin: 10,
    width: 300,
    backgroundColor: '#ECECEC',
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    paddingStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input2: {
    height: 50,
    margin: 10,
    width: 300,
    backgroundColor: '#05668D',
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    paddingStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    color: '#05668D',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputText2: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',

  },
  icono: {
    color: '#05668D',
    fontSize: 30,
    fontWeight: 'bold',
  },
  icono2: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#05668D',
    textTransform: 'uppercase',
  },
  starsContainer: {
    flexDirection: 'row',
  },
});
