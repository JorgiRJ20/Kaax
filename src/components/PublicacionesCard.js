
import {SafeAreaView,View, Text, Button,TouchableWithoutFeedback,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
export default function PublicacionesCard(props) {

	const navigation = useNavigation();

const {publicaciones} = props

const goToPublicacion = () =>{
    navigation.navigate('DetallePublicacion',{idPublicacion:publicaciones.idPublicacion,
	titulo: publicaciones.titulo,
	descripcion: publicaciones.descripcion,
	pago: publicaciones.pago,
	fechaTrabajo: publicaciones.fechaTrabajo,
	horaTrabajo: publicaciones.horaTrabajo,
	status: publicaciones.status,
	user: publicaciones.user.name,
})
  }
   const goToCrearPu = () => {
	navigation.navigate('CrearPublicacion'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
  };
  return (
<TouchableWithoutFeedback onPress={goToPublicacion}>
<SafeAreaView style={styles.containerform1}>
	  <View style={styles.card1}>
		<Image
			source={require('../assets/departamento.jpg')}
			style={styles.image1}
		  />
		 <View style={styles.textContainer1}>
          <Text style={styles.title1}>{publicaciones.titulo}</Text>
		  <Text style={styles.subtitle1}>{publicaciones.user.name}</Text>
			
			<View style={styles.horizontalTextContainer1}>
			<Icon name='money' style={styles.icono1}/>
            <Text style={styles.horizontalText1}>${publicaciones.pago}</Text>
			<Icon name='location-arrow' style={styles.icono1}/>
            <Text style={styles.horizontalText1}>1.5KM</Text>
          </View>
        </View>
		</View>
		<Button onPress={goToCrearPu} title='ir a crear'/>
   </SafeAreaView>
  </TouchableWithoutFeedback>	
  )
}
const styles = StyleSheet.create({
	containerform1:{
		alignItems:'center',
		justifyContent: 'center',
	},
	card1: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20,
		marginTop:10,
		shadowColor: '#000',
		 width: 345, 
		 height: 120,
		elevation: 10,
		flexDirection:'row',
		marginBottom:10,
		alignItems:'center',
		
	  },
	  icono1:{
		fontSize:18,
		color:'#05668D',
		marginStart:10
	  },
	  image1: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginRight: 4,
	  },
	  title1: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
		left:10,
		color:'#05668D'
	  },
	  subtitle1: {
		fontSize: 15,
		textAlign: 'left',
		marginBottom: 8,
		left:10
	  },
	  horizontalTextContainer1: {
		flexDirection: 'row',
		left:10
	  },
	  horizontalText1: {
		fontSize: 15,
		marginStart:10,
		color: '#555',
	  }
	});