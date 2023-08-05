import { View, Text,StyleSheet,Image,SafeAreaView} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DetallePublicacion() {
  return (
    <SafeAreaView style={styles.containerform}>
        <Image source={require('../assets/departamento.jpg')} style={styles.imagen}/>
      <Text style={styles.title}>Limpieza Departamento</Text>
      <Text style={styles.descripcion}>Limpieza de departamento pequeño, limpiar, ordenar y escombrar un cuarto, de la misma manera seria la sala. Solamente serian estos dos espacios.</Text>
    <View style={styles.lineacard}>
        <View style={styles.cards}>
          <Icon name="money" color={'#05668D'} size={25}/>
          <Text style={styles.texto}> $2,000</Text>
        </View>
        <View style={styles.cards}>
        <Icon name="arrows-h" color={'#05668D'} size={25}/>
          <Text style={styles.texto}>1.5KM</Text>
        </View>
    </View>

    <View style={styles.lineacard}>
        <View style={styles.cards}>
          <Icon name="user" color={'#05668D'} size={25}/>
          <Text style={styles.texto}> Rodrigo Alonso Contador</Text>
        </View>
        <View style={styles.cards}>
          <Icon name="calendar" color={'#05668D'} size={25}/>
          <Text style={styles.texto}> 04/06/2023 </Text>
          <Text style={styles.texto}>13:30</Text>
        </View>
    </View>
    
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
	containerform:{
        backgroundColor: '#F8F9FA',
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal:15,
	},
    imagen:{
        width: 370,
        height: 170,
        resizeMode: 'cover',
        marginBottom: 10,
        marginTop:15,
    },
    title: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 8,
		color:'#05668D'
	  },
      descripcion: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 8,

	  },
      lineacard:{
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems:'center',
      },
      cards:{
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 90,
        elevation: 10, 
        
      },
      texto:{
        fontSize: 15,
		color: '#555',
        textAlign:'center'
      }

})