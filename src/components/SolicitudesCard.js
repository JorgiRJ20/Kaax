import React from 'react'
import { TouchableOpacity,View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function SolicitudesCard(props) {
	const navigation = useNavigation();
	const handleButtonPress = () => {
		navigation.navigate('Solicitud'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
	  };
	  
    return (
		<View style={styles.card}>
		<Image
			source={require('../assets/departamento.jpg')}
			style={styles.image}
		  />
		 <View style={styles.textContainer}>
          {/* Título centrado */}
          <Text style={styles.title}>Limpieza de departamento</Text>
		  <Text style={styles.subtitle}>Rodrigo Alonso</Text>
			{/* Dos textos horizontales */}
			<View style={styles.horizontalTextContainer}>
			<Icon name='money' style={styles.icono}/>
            <Text style={styles.horizontalText}>$2,000</Text>
			<Icon name='location-arrow' style={styles.icono}/>
            <Text style={styles.horizontalText}>1.5KM</Text>
          </View>
        </View>
		<TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>En espera</Text>
      </TouchableOpacity>
		</View>
		
	  );
	};
	
	const styles = StyleSheet.create({
        card: {
			backgroundColor: '#fff',
			borderRadius: 8,
			padding: 20,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 3,
			elevation: 5,
			flexDirection:'row',
			marginBottom:10
		  },
		  icono:{
			fontSize:18,
			color:'#05668D'
		  },
		  image: {
			width: 100,
			height: 100,
			borderRadius: 8,
			marginRight: 4,
		  },
		  title: {
			fontSize: 18,
			fontWeight: 'bold',
			textAlign: 'center',
			marginBottom: 8,
			left:10,
			color:'#05668D'
		  },
		  subtitle: {
			fontSize: 15,
			textAlign: 'left',
			marginBottom: 8,
			left:10
		  },
		  horizontalTextContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			left:10
		  },
		  horizontalText: {
			fontSize: 15,
			color: '#555',
		  },
		  button: {
			backgroundColor: '#05668D',
			paddingVertical: 5,
			paddingHorizontal: 50,
			borderRadius: 40,
			alignSelf: 'flex-end',
			right:150,
			marginBottom:-10
		  },
		  buttonText: {
			color: '#fff',
			fontSize: 15,
			fontWeight:'bold'
		  },
		});
		
	
	
	