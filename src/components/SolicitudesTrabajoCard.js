import React from 'react'
import { TouchableOpacity,View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import {addHours, isAfter, isBefore} from 'date-fns'

export default function SolicitudesTrabajoCard(props) {
	const navigation = useNavigation();
	//console.log(props.idPostulacion)

	let estatus = props.status;

	const formatDate = (dateString) => {
		if (dateString) {
		  const date = new Date(dateString);
		  return format(date, 'dd-MM-yyyy'); // Formato 'dd-MM-yyyy'
		}
		return '';
	};
	
	const handleButtonPress = () => {
		if (props.status === 'En espera') {
		  // No se permite la acción para estado 'En espera'
		  return;
		} else if (props.status === 4) {
			navigation.navigate('LimpiezaCheck1', { idPostulacion: props.idPostulacion }); 
		} else if (props.status === 2 && buttonText === 'Calificar') {
			navigation.navigate('LimpiezaCheck', { idPostulacion: props.idPostulacion }); 
		} else if (props.status === 1) {
			navigation.navigate('DetallePostulacion', { idPostulacion: props.idPostulacion }); 
		}
	};
	
	  let buttonColor = '';
	  switch (props.status) {
		case 1:
		  buttonColor = '#0F94CA'; 
		  break;
		case 2:
		  buttonColor = '#08A045'; 
		  break;
		case 3:
		  buttonColor = '#E5383B'; 
		  break;
		case 4:
		  buttonColor = '#800080'; 
		  break;
		default:
		  buttonColor = '#05668D'; 
	  }
	
	let buttonText = '';
	let buttonDisabled = true;
	  switch (estatus) {
		case 1:
		  	buttonText = 'En espera';
			break;
		case 2:
    		const horaTrabajo = new Date(props.fechaTrabajo + " " + props.horaTrabajo);
    		const limiteCalificacion = addHours(horaTrabajo, 24);
    
    		if (isAfter(new Date(), horaTrabajo) && isBefore(new Date(), limiteCalificacion)) {
      			buttonText = 'Calificar';
      			buttonColor = '#800080'; // Morado
      			buttonDisabled = false; // Habilitar el botón durante las primeras 24 horas
    		} else if (isAfter(new Date(), limiteCalificacion)) {
      			buttonText = 'Finalizado';
    		} else {
      			buttonText = 'Aceptada';
      			buttonDisabled = false; // Habilitar el botón
    		}
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
	<TouchableOpacity 
		  onPress={handleButtonPress}
		  style={styles.card}>
		<View style={styles.containerImage}>
        	<Image source={{ uri: props.imagenUrl }}
          	style={styles.image}
        />
      	</View>
		<View style={styles.containerInfo}>
        	<View style={{flex: 0.7}}>
          		<Text style={styles.title}>{props.titulo}</Text>
          		<Text style={styles.subtitle}>{props.namePostulante}</Text>
        	</View>
        	<View style={styles.containerContentIconInfo}>
          		<View style={styles.containerIconInfo}>
              		<Icon name='calendar' style={styles.icono}/>
              		<Text style={styles.horizontalText}> {formatDate(props.fecha)}</Text>
          		</View>
          		<View style={styles.containerIconInfo}>
            		<View style={[styles.statusButton, { backgroundColor: buttonColor }]}>
              			<Text style={styles.statusButtonText}>{buttonText}</Text>
            		</View>
          		</View>
        	</View>
      	</View>
	</TouchableOpacity>
);
};
	
	const styles = StyleSheet.create({
	  card: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 12,
		shadowColor: '#000',
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2, 
		shadowRadius: 4, 
		elevation: 8, 
		margin: 10,
		padding: 10
		
	  },
	  icono:{
		fontSize:18,
		color:'#05668D',
	  },
	  image: {
		resizeMode: 'cover',
		width: '100%',
		height: 120,
		borderRadius: 8,
	  },
	  title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
		color:'#05668D',
	  },
	  subtitle: {
		color: '#b1b1b1',
		fontSize: 16,
		textAlign: 'left',
		marginBottom: 8,
		fontStyle: 'italic',
	  },
	  
	  containerImage: {
		flex: 1
	  },
	  containerInfo: {
		flex: 1, 
		flexDirection: 'row',
		marginTop: 4
	  },
	  containerContentIconInfo: {
		flex: 0.3, 
		justifyContent: 'center', 
		alignItems: 'flex-end'
	  },
	  containerIconInfo: {
		flexDirection: 'row',
		marginBottom: 5
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
		alignItems: 'center', 
		marginTop: 10, 
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
	
	
	
	
			
		
		
		