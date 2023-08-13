import {SafeAreaView,View, Text, Button,TouchableWithoutFeedback,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Palette from '../../constants/Palette';

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
        is_location_available: publicacionesLim.is_location_available,
        locations_distance: publicacionesLim.locations_distance
    })
      }
      return (
        <TouchableOpacity 
        onPress={goToPublicacion}
          style={styles.card}
        >
          <View style={styles.containerImage}>
            <Image
              source={require('../../assets/departamento.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.containerInfo}>
            <View style={{flex: 0.7}}>
              <Text style={styles.title}>{publicacionesLim.titulo}</Text>
              <Text style={styles.subtitle}>{publicacionesLim.user.name}</Text>
            </View>
            <View style={styles.containerContentIconInfo}>
              <View style={styles.containerIconInfo}>
                  <Icon name='money' style={styles.icono}/>
                  <Text style={styles.horizontalText}>${publicacionesLim.pago}</Text>
              </View>
              {/* Verificamos si la distancia esta disponible */}
              {publicacionesLim.is_location_available && (
                <View style={styles.containerIconInfo}>
                    <Icon name='location-arrow' style={styles.icono}/>
                    <Text style={styles.horizontalText}>{publicacionesLim.locations_distance}</Text>
                </View>
              )}
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