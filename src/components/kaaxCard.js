import React from 'react'
import { TouchableOpacity,View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function kaaxCard(props) {
	const navigation = useNavigation();
	const handleButtonPress = () => {
		navigation.navigate('Solicitud'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
	  };
	  
    return (
		<View style={styles.card}>
		  <Image
			source={require('../assets/departamento.jpg')}
			style={styles.cardImage}
		  />
		  <View style={styles.cardContent}>
			<Text style={styles.cardTitle}>Título de la tarjeta</Text>
			<Text style={styles.cardDescription}>Descripción de la tarjeta</Text>
		  </View>
            <TouchableOpacity onPress={handleButtonPress} style={styles.floatingButton} >
        	<Text style={styles.buttonText}>+</Text>
      		</TouchableOpacity>
		</View>
	  );
	};
	
	const styles = StyleSheet.create({
        container: { paddingHorizontal: 0, marginTop: 30 },
	  card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		elevation: 4,
		marginVertical: 4,
		marginHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 35,
        
		
	  },
      button: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
	  cardImage: {
		width: 90,
		height: 90,
		
	  },
	  cardContent: {
		marginLeft: 16,
	  },
	  cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	  },
	  cardDescription: {
		fontSize: 14,
		color: '#888',
		marginTop: 4,
	  },
	  floatingButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		backgroundColor: '#8EA604',
		borderRadius: 50,
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
	  },
	  buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	  },
	});
	
	
	