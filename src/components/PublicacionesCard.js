
import {SafeAreaView,View, Text, Button,TouchableWithoutFeedback,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Palette from '../constants/Palette';
export default function PublicacionesCard(props) {

	const navigation = useNavigation();

const {publicaciones} = props

const goToPublicacion = () =>{
    navigation.navigate('DetallePublicacion',{idPublicacion:publicaciones.idPublicacion,
	titulo: publicaciones.titulo,
	descripcion: publicaciones.descripcion,
	numCuartos: publicaciones.numCuartos,
	pago: publicaciones.pago,
	fechaTrabajo: publicaciones.fechaTrabajo,
	horaTrabajo: publicaciones.horaTrabajo,
	status: publicaciones.status,
	user: publicaciones.user.name,
	direccion: publicaciones.direccion.idDireccion,
	nameDireccion: publicaciones.direccion.nameDireccion,
	userId: publicaciones.user.idUser,
	userPhone: publicaciones.user.phone,
	userEmail: publicaciones.user.email,
	
})
  }
   const goToCrearPu = () => {
	navigation.navigate('CrearPublicacion'); // Reemplaza 'Detalles' con la ruta de la pantalla a la que deseas navegar
  };
  return (
	<TouchableOpacity 
	onPress={goToPublicacion}
	  style={styles.card}
	>
	  <View style={styles.containerImage}>
		<Image
		  source={{ uri: publicaciones.imagenUrl }}
		  style={styles.image}
		/>
	  </View>
	  <View style={styles.containerInfo}>
		<View style={{flex: 0.7}}>
		  <Text style={styles.title}>{publicaciones.titulo}</Text>
		  <Text style={styles.subtitle}>{publicaciones.user.name}</Text>
		</View>
		<View style={styles.containerContentIconInfo}>
		  <View style={styles.containerIconInfo}>
			  <Icon name='money' style={styles.icono}/>
			  <Text style={styles.horizontalText}>${publicaciones.pago}</Text>
		  </View>
		  
		</View>
	  </View>
	</TouchableOpacity>
  )
}
const styles = StyleSheet.create({
	containerform:{
		alignItems:'center',
		justifyContent: 'center',
	},
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
		margin: 12,
		padding: 5
		
	  },
	  icono:{
		fontSize:18,
		color:'#05668D',
	  },
	  image: {
		resizeMode: 'cover',
		width: '100%',
		height: 160,
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
	  horizontalTextContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	  },
	  horizontalText: {
		fontSize: 15,
		color: Palette.colors.black,
		marginStart:10,
		fontWeight: 'bold'
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
	  }
	});