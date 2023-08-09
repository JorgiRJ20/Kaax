import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity, } from 'react-native';
import React, { useRef } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ButtonLogin from '../components/ButtonLogin';
import DescripcionContainer from '../components/DescripcionContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheetOpinion from '../components/BottomSheetLimpiezaCheck';


export default function Solicitud() {

    return (
		
	<View style={{ flex: 2 }}>
      {/* Otros componentes de tu aplicación aquí */}
	  <View style={styles.mainContainer}>
	  <View style={styles.containerSvg}>
				<Text style={styles.title}>Tu opinión es importante</Text> 
				<Image
			 		source={require('../assets/kaaxCheck.png')}
			 		style={{ width: 180, height: 180, top: -60, left:8}}
		 		/>
				
		 		<Text style={styles.subtitle}>Nombre Empleo</Text> 
				 <View style={styles.ContainerStatus}>
				<Text style={styles.name}><Icon name="user" size={24}  style={styles.icon} /> Nombre de usuario </Text>
			</View>
			<View style={styles.ContainerStatus}>
				<Text style={styles.name}><Icon name="calendar" size={24} style={styles.icon} /> Fecha solicitud </Text>
			</View>
			<View style={styles.ContainerStatus}>
				<Text style={styles.name}><Icon name="calendar" size={24} style={styles.icon} /> Fecha Respuesta </Text>
			</View>
			</View>
      <BottomSheetOpinion />
    </View>
	</View>
			
			
			  
     
    
	    
			
      )
}

const styles = StyleSheet.create({
    container: {
		padding: 10,
		backgroundColor: '#F0F0F0',
		borderRadius: 8,
		marginVertical: 10,
		alignItems:'center'
	  },
	  card: {
		width: 350,
		height: 55,
		marginVertical: 8,
		padding: 15,
		backgroundColor: '#f2f2f2',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		marginTop:2,
	  },
	  name: {
		marginTop: 0,
		fontSize: 20,
		textAlign: 'center',
	  },
	  descripcion: {
		fontSize: 16,
		color: '#333',
	  },
	  titleNumero: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign:'center',
		top:0
		
	  },
	  ContainerStatus: {
		marginBottom: 8,
		backgroundColor:'#EEEBEB',
		borderRadius:'10',
		height:50,
		width:380,
		marginTop: 2,
		justifyContent:'center',
		
	  },
	  card: {
		backgroundColor: '#EEEBEB',
		borderRadius: 8,
		elevation: 4,
		marginVertical: 4,
		marginHorizontal: 2,
		flexDirection: 'row',
		alignItems: 'right',
		padding: 75,
		
        
		
	  },
	  
	
	
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
	  cardImage: {
		width: 190,
		height: 190,
		
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
	  
	  title:{
        textAlign: 'center',
        fontSize:40,
        fontWeight:'bold',
        marginTop: 5,
        marginBottom: 45,
        marginTop:20,
        color:'#05668D'
    },
	subtitle:{
        textAlign: 'center',
        fontSize:28,
        fontWeight:'bold',
        marginTop: -80,
        marginBottom: 10, 
        color:'#05668D'
    },
	mainContainer: {
		backgroundColor: '#FFF',
		height: '100%',
	},
	containerSvg: {
		
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
        marginRight: 15,
        color: '#8EA604',
        fontSize: 20,
        fontWeight: 'bold',
		left:125
      },
	 
     
})