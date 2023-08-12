import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function SolicitudesCard(props) {
  const navigation = useNavigation();
  

  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleButtonPress = () => {
    if (props.status === 'En espera') {
      // No se permite la acción para estado 'En espera'
      return;
    } else if (props.status === 4) {
      navigation.navigate('LimpiezaCheck'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
    }
  };

  let buttonColor = '';
  switch (props.status) {
    case 1:
      buttonColor = '#0F94CA'; // Azul
      break;
    case 2:
      buttonColor = '#08A045'; // Verde
      break;
    case 3:
      buttonColor = '#E5383B'; // Rojo
      break;
    case 4:
      buttonColor = '#800080'; // Morado
      break;
    default:
      buttonColor = '#05668D'; // Color predeterminado
  }

  let buttonText = '';
  let buttonDisabled = true;
  switch (props.status) {
    case 1:
      buttonText = 'En espera';
      break;
    case 2:
      buttonText = 'Aceptada';
      break;
    case 3:
      buttonText = 'Rechazada';
      break;
    case 4:
      buttonText = 'Calificar';
      buttonDisabled = false; // Habilitar el botón
      break;
    default:
      buttonText = '';
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        
        <Image
        source={require('../assets/departamento.jpg')}
        style={styles.image}
      />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.titulo}</Text>
        <Text style={styles.description}>
          {props.descripcion.length > 50
            ? props.descripcion.substring(0, 50) + '...'
            : props.descripcion}
        </Text>
        <View style={styles.priceContainer}>
            <Icon name='money' style={styles.icono} />
            <Text style={styles.price}> $ {props.precio}</Text>
        </View>
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: buttonColor }]}
          onPress={handleButtonPress}
          disabled={buttonDisabled}
        >
          <Text style={styles.statusButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10, // Agrega bordes redondeados
    backgroundColor: 'white', // Fondo blanco para la tarjeta
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 2, // Elevación para la sombra en Android
    marginBottom: 10, // Espacio entre tarjetas
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#05668D"
  },
  description: {
    fontSize: 15,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  
  
  statusButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statusButtonText: {
    color: 'white',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center', // Centrar horizontalmente el botón
    marginTop: 10, // Espacio adicional entre el contenido y el botón
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 50,
    borderRadius: 40,
    alignSelf: 'flex-end',
    right: 150,
    marginBottom: 20,
    marginTop: 120,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  icono: {
    fontSize: 18,
    color: '#05668D',
  },
  
});




		
	
	
	