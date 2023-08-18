import { View, Text,SafeAreaView,StyleSheet,Image } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";

const pinPlace = require('../assets/images/markPlace.png');


export default function DetalleDirecciones(props) {
  const {navigation, route:{params}} = props

  return (
    <SafeAreaView style={styles.containerform}>
        <Text style={styles.title}>{params.nameDireccion}</Text>
         <View style={styles.cards}>
            <Text style={styles.bolds}>Estado:</Text>
            <Text style={styles.texto}>{params.estado}</Text>
         </View>
         <View style={styles.cards}>
            <Text style={styles.bolds}>Municipio:</Text>
            <Text style={styles.texto}>{params.municipio}</Text>
         </View>
         <View style={styles.cards}>
            <Text style={styles.bolds}>Colonia:</Text>
            <Text style={styles.texto}>{params.colonia}</Text>
         </View>
         <View style={styles.cards}>
            <Text style={styles.bolds}>Calle:</Text>
            <Text style={styles.texto}>{params.calle}</Text>
         </View>
         <View style={styles.cards}>
            <Text style={styles.bolds}>Numero Exterior:</Text>
            <Text style={styles.texto}>{params.numExt}</Text>
         </View>
         <View style={styles.cards}>
            <Text style={styles.bolds}>Codigo Postal:</Text>
            <Text style={styles.texto}>{params.codigoPostal}</Text>
         </View>

         <MapView 
                
                style={styles.mapView}
                initialRegion={{
                    latitude: 20.5223,
                    longitude: -99.8883,
                    latitudeDelta: 0.00,
                    longitudeDelta: 0.01,
                }}
                // onRegionChange={handleRegionChange}
                //onRegionChangeComplete={handleRegionChange}
                >
            </MapView>
            
            {/* Imagen que va a estar centrada en la pantalla y servirá como guía para ubicar donde quieres la localización */}
            {/*<Image source={pinPlace} style={styles.pinMarker} />*/}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    containerform:{
        backgroundColor: '#F8F9FA',
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal:10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop:15,
        color:'#05668D'
      },
    cards:{
        flexDirection:'row',
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 40,
        elevation: 10, 
        
      },
      texto:{
        fontSize: 15,
        color: '#555',
        textAlign:'center',
        margin:2,
      },
      bolds:{
        fontSize: 16,
        color: '#555',
        fontWeight:'bold',
        textAlign:'center'
      },
      mapView: {
        width: 300,
        height:250,
        marginTop:10,
    },
    bottomModalContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    pinMarker: {
        width: 80,
        height: 80,
        position: 'absolute',
    },
})