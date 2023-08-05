
import {SafeAreaView,View, Text, Button,TouchableWithoutFeedback,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function PublicacionesCard(props) {

	const navigation = useNavigation();

const {publicaciones} = props

 const goToPublicacion = () =>{
	console.lof(` Conoce mas de la publicación: ${publicaciones.titulo}`)
 }
 const goToDetalle = () => {
	 navigation.navigate('DetallePublicacion'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
   };
   const goToCrearPu = () => {
	navigation.navigate('CrearPublicacion'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
  };
  return (
	/*<TouchableWithoutFeedback onPress={goToPublicacion}>
   <Text>Hola publicaciones</Text>
  </TouchableWithoutFeedback>*/
    <SafeAreaView style={styles.containerform}>
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
		</View>
		<Button onPress={goToDetalle} title='ir a detalle'/>
		<Button onPress={goToCrearPu} title='ir a crear'/>
		</SafeAreaView>
		
      
  )
}
const styles = StyleSheet.create({
	containerform:{
        alignItems:'center',
        justifyContent: 'center'
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20,
		marginTop:55,
		shadowColor: '#000',
		 width: 345, 
		 height: 120,
		elevation: 10,
		flexDirection:'row',
		marginBottom:10,
        alignItems:'center',
        justifyContent: 'center'
		
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
		justifyContent: 'space-evenly',
		left:10
	  },
	  horizontalText: {
		fontSize: 15,
		color: '#555',
	  }
	});