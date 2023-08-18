import { View, Text, StyleSheet,Button,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';




export default function MyLocations(props) {

  const navigation = useNavigation();

const {direcciones} = props

        const goToDirecciones = () =>{
          navigation.navigate('AddLocation',{
          dataLocation:{latitude:parseFloat(direcciones.latitud),
          longitude:parseFloat(direcciones.longitud),},
          infoLocalisacion:{
          idDireccion: direcciones.idDireccion,
          nameDireccion:direcciones.nameDireccion,
          estado: direcciones.estado,
          municipio: direcciones.municipio,
          calle: direcciones.calle,
          colonia: direcciones.colonia,
          numExt: direcciones.numExt,
          codigoPostal: direcciones.codigoPostal,
          latitud: direcciones.latitud,
          longitud: direcciones.longitud,
          activo: direcciones.activo,
          user: direcciones.user.idUser,
          }
        }); 
      };

    return (
      <TouchableWithoutFeedback onPress={goToDirecciones}>
        <SafeAreaView style={styles.containerform}>
          <View style={styles.card}>
               <View style={styles.cardI}>
                <Icon name="home" color={'#05668D'} size={60}/>
               </View>
             <View style={styles.textContainer}>
              <Text style={styles.title}>{direcciones.nameDireccion}</Text>
              <Text style={styles.subtitle}>{direcciones.colonia}</Text>
              <Text style={styles.subtitle}>{direcciones.calle}</Text>
            </View>
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
        containerform:{
            alignItems:'center',
           
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 10,
            shadowColor: '#000',
             width: 345, 
             height: 90,
            elevation: 10,
            flexDirection:'row',
            marginBottom:1,
            alignItems:'center',
            
            
          },
          icono:{
            fontSize:18,
            color:'#05668D',
            marginStart:10,
          },
          image: {
            width: 100,
            height: 100,
            borderRadius: 8,
            marginRight: 4,
          },
          title: {
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 8,
            left:10,
            color:'#05668D'
          },
          subtitle: {
            fontSize: 14,
            textAlign: 'left',
            marginBottom: 8,
            left:10,
            flexDirection:'row'
          },
          horizontalTextContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            left:10
          },
          horizontalText: {
            fontSize: 15,
            color: '#555',
            marginStart:10,
          },
          cardI:{
            backgroundColor: '#E1E1E1',
            margin: 10,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: 75,
            height: 75,
          },
          texto:{
            fontSize: 15,
            color: '#555',
            textAlign:'center'
          }
        });