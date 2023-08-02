import React from 'react'
import { TouchableOpacity,View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function SolicitudesTrabajoCard(props) {
	const navigation = useNavigation();
	const handleButtonPress = () => {
		navigation.navigate('Solicitud'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
	  };
	  
    return (
		<View style={styles.card}>

		 <View style={styles.textContainer}>
          {/* Título centrado */}
          <Text style={styles.title}>Limpieza de departamento</Text>
		  <Text style={styles.subtitle}>Rodrigo Alonso</Text>
			{/* Dos textos horizontales */}
			<View style={styles.horizontalTextContainer}>
			<Icon name='calendar' style={styles.icono}/>
            <Text style={styles.horizontalText}>  21/07/2023 12:00</Text>
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
			marginBottom:10,
			height:130
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
			justifyContent: 'flex-start',
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
			right:30,
			marginBottom:-10
		  },
		  buttonText: {
			color: '#fff',
			fontSize: 15,
			fontWeight:'bold'
		  },
		});
		
	
	
	