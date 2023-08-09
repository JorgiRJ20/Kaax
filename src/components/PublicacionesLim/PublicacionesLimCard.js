import {SafeAreaView,View, Text, Button,TouchableWithoutFeedback,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function PublicacionesLimCard(props) {
    const navigation = useNavigation();

    const {publicacionesLim} = props
    
    const goToPublicacion = () =>{
        navigation.navigate('DetallePublicacionLim',{idPublicacion:publicacionesLim.idPublicacion,
        titulo: publicacionesLim.titulo,
        descripcion: publicacionesLim.descripcion,
        pago: publicacionesLim.pago,
        fechaTrabajo: publicacionesLim.fechaTrabajo,
        horaTrabajo: publicacionesLim.horaTrabajo,
        status: publicacionesLim.status,
        user: publicacionesLim.user.name,
    })
      }
      return (
    <TouchableWithoutFeedback onPress={goToPublicacion}>
    <SafeAreaView style={styles.containerform}>
          <View style={styles.card}>
            <Image
                source={require('../../assets/departamento.jpg')}
                style={styles.image}
              />
             <View style={styles.textContainer}>
              <Text style={styles.title}>{publicacionesLim.titulo}</Text>
              <Text style={styles.subtitle}>{publicacionesLim.user.name}</Text>
                
                <View style={styles.horizontalTextContainer}>
                <Icon name='money' style={styles.icono}/>
                <Text style={styles.horizontalText}>${publicacionesLim.pago}</Text>
                <Icon name='location-arrow' style={styles.icono}/>
                <Text style={styles.horizontalText}>1.5KM</Text>
              </View>
            </View>
            </View>
            
       </SafeAreaView>
      </TouchableWithoutFeedback>
      )
    }
    const styles = StyleSheet.create({
        containerform:{
            alignItems:'center',
            justifyContent: 'center',
        },
        card: {
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
            marginStart:10,
          }
        });