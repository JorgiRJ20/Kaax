import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView

} from 'react-native';
import React from 'react';


export default function RickandmortyCard(props) {
	return (
		<View style={styles.container}>
      		<ScrollView contentContainerStyle={styles.cardContainer}>
			<View style={styles.card}>
			 <Image
			 source={require('../assets/departamento.jpg')}
			 style={styles.image}
		 />
			  <View style={styles.textContainer}>
				<Text style={styles.title}>CERCA DE (TITULO DE UBICACIÓN)</Text>
			  </View>
			  <View style={styles.ContainerStatus}>
				<Text style={styles.titleStatus}>STATUS</Text>
			  </View>
			  <View style={styles.ContainerNumero}>
			  <Image
			 source={require('../assets/kaax.png')}
			 style={styles.imageNumero}
		     />
			 <Text style={styles.titleNumero}>1234567890</Text>
			  </View>
			</View>
			</ScrollView>
    </View>
	  );
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
		  },
		  cardContainer: {
			marginTop: 50,
			paddingHorizontal: 15,
		  },
		card: {
			backgroundColor: '#FFFFFF',
			borderRadius: 8,
			padding: 15,
			shadowColor: '#000000',
			shadowOffset: {
			  width: 0,
			  height: 2,
			},
			shadowOpacity: 0.2,
			shadowRadius: 4,
			elevation: 2,
			alignItems:'center'
		  },
		  image: {
			width: '100%',
			height: 180,
			borderRadius: 8,
			marginBottom: 8,
		  },
		  textContainer: {
			marginBottom: 8,
		  },
		  title: {
			fontSize: 18,
			fontWeight: 'bold',
			marginBottom: 4,
		  },
		  description: {
			fontSize: 14,
		  },
		  ContainerStatus: {
			marginBottom: 8,
			backgroundColor:'#ADCAD6',
			borderRadius:'10',
			height:30,
			width:200,
			justifyContent:'center',
		  },
		  titleStatus: {
			fontSize: 20,
			fontWeight: 'bold',
			textAlign:'center'
		  },
		  ContainerNumero: {
			marginBottom: 8,
			backgroundColor:'#F0EEEE',
			borderRadius:'10',
			height:30,
			width:200,
			justifyContent:'center',
		  },
		  titleNumero: {
			fontSize: 15,
			fontWeight: 'bold',
			textAlign:'center',
			top:-10
			
		  },
		  imageNumero: {
			width:20,
			height: 20,
			top:8,
			left:18
		  },
		});