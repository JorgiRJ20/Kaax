import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity,Alert } from 'react-native'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from "expo-location";
import BottomSheet from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import Palette from '../constants/Palette';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { URL_API } from '../utils/enviroments';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Modal } from 'react-native-paper';


const pinPlace = require('../assets/images/markPlace.png');

export default function ShowLocation(props) {
    console.log(props.route.params)
    const {auth} = useAuth();
    let token = auth.token;
    let idUser = auth.idUser;

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };


    

 
    const [message, setMessage] = React.useState("");
    const [visibleMod, setVisibleMod] = React.useState(false);
    const showModal = () => setVisibleMod(true);
    const hideModal = () => setVisibleMod(false);
    


    const goToDirecciones = () => {
        //navigation.navigate("ApiDirecciones");
        navigation.goBack();
    }

    const navigation = useNavigation();

    // Datos de localización que se recibiran cuando se requiera actualizar la ubicación
    const { dataLocation, infoLocation , infoLocalisacion} = props.route.params;

    const isUpdate = dataLocation ? true : false;

    // ref bottom modal
    const bottomSheetRef = useRef(null);

    // variables snapoint avaible in bottom modal
    const snapPoints = useMemo(() => ["20%", "34%", "60%", "80%"]);

    // callbacks bottom modal
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
        // Actualizamos variable para saber en que nivel esta expandia la modal
        setCurrentSnapPoint(index);
    }, []);

    const default_location = {
        latitude: 20.5881276,
        longitude: -100.389806,
    };
    const [origin, setOrigin] = useState(isUpdate ? dataLocation : default_location);
    const originRef = useRef(isUpdate ? dataLocation : default_location);
    const [currentLocation, setCurrentLocation] = useState(default_location);
    const currentLocationRef = useRef({});

    const [infoOrigin, setInfoOrigin] = useState({});
    const [mapReady, setMapReady] = useState(false);
    const mapRef = useRef(null);
    const [searchLocation, setSearchLocation] = useState("");
    const [gettingLocation, setGettingLocation] = useState(false);
    const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
    const permissionsGranted = useRef(false);


    /**
     * Función para pedir permisos al usuario de usar su localización
     * @date 8/4/2023 - 10:25:21 PM
     * @author Alessandro Guevara
     *
     * @async
     * @returns {Promise resolve} - [true | false]
     */
    const requestPermissions = async () => {

        return new Promise(async (resolve) => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                console.log("PERMISOS DENEGADOS");
                // Si no da los permisos regresamos a la pantalla anterior, 
                // porque para toda la API Location se necesitan permisos
                navigation.goBack();
                permissionsGranted.current = false;
                resolve(false);
            }else {
                permissionsGranted.current = true;
                resolve(true);
            }
        })

        
    }

    /**
     * Función para centrar el mapa pasandole la latitud y longitud de una localización
     * @date 8/4/2023 - 5:37:20 PM
     * @author Alessandro Guevara
     *
     * @type {*}
     */
    const handleCenterMap = useCallback(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: originRef.current.latitude,
                longitude: originRef.current.longitude,
                latitudeDelta: 0.0001,
                longitudeDelta: 0.0009
            });
        }
    });

    /**
     * Función para obtener los datos al soltar en pin del mapa
     * @date 8/3/2023 - 7:51:27 PM
     * @author Alessandro Guevara
     */
    const handleOnDragEnd = (direction) => {
        setOrigin(direction.nativeEvent.coordinate);
    }

    /**
     * Función para obtener latitud y longitud a partir de un texto de una localización
     * @date 8/4/2023 - 5:40:45 PM
     * @author Alessandro Guevara
     *
     * @async
     * @returns {*}
     */
    const geocodeLocation = async () => {

        if(permissionsGranted.current) {

            // Verificamos que el texto no este vació
            if(searchLocation != "") {
                const geocode = await Location.geocodeAsync(searchLocation);

                // Verificamos si se encontraron datos
                if(geocode[0] === undefined) {
                    console.log("Ubicación no encontrada");
                    return
                }

                const objLocation = {
                    latitude: geocode[0].latitude,
                    longitude: geocode[0].longitude
                }
                setOrigin(objLocation);
                originRef.current = objLocation;
                handleCenterMap();


            }
        }else {
            navigation.goBack();
        }
    }
    /**
     * Función para obtener datos de la localización a partir de su latitud y longitud
     * @date 8/3/2023 - 8:40:21 PM
     * @author Alessandro Guevara
     *
     * @async
     * @returns {*}
     */
    const reverseGeocodeLocation = async () => {
        if(permissionsGranted.current) {

            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: originRef.current.latitude,
                longitude: originRef.current.longitude
            });

            setInfoOrigin(reverseGeocode[0]);
        }else {
            navigation.goBack();
        }
    }

    /**
     * Función para actualizar la posicion del marcador cada que se mueve la posición del mapa
     * @date 8/3/2023 - 8:23:40 PM
     * @author Alessandro Guevara
     *
     * @param {*} region
     */
    const handleRegionChange = (region) => {
        
        setOrigin({
            latitude: region.latitude,
            longitude: region.longitude,
        });
        originRef.current = {
            latitude: region.latitude,
            longitude: region.longitude,
        };
        reverseGeocodeLocation();
        
    }

    
    
    /**
     * Función para obtener ubicación actual del dispositivo del usuario
     * @date 8/3/2023 - 8:30:46 PM
     * @author Alessandro Guevara
     *
     * @async
     * @returns {*}
     */
    const getUserLocation = async () => {

        if(permissionsGranted.current) {
            // setGettingLocation(true);

            let location = await Location.getCurrentPositionAsync({
                accuracy: 6
            });
            const current_location = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }

            setCurrentLocation(current_location);
            currentLocationRef.current = current_location;
            // reverseGeocodeLocation();
            // handleCenterMap();
            // setGettingLocation(false);

        }else {
            navigation.goBack();
        }
    }

    /**
     * Función para manejar click de botón guardar, y verificar si ya hay algo en el input de 
     * nombre de ubicación
     * @date 8/4/2023 - 9:41:34 PM
     * @author Alessandro Guevara
     */
    const handlePressBtn = () => {

        // Verificamos si el input esta vació
        if(inputName === "") {

            // Verificamos si el modal esta en el punto 0, porque es cuando no mostramos el input
            if(currentSnapPoint === 0) {

                // Movemos el modal al punto 1, para que se vea el input
                bottomSheetRef.current?.snapToIndex(1);
                return
            }

            // Si no entro a el if se guardan los datos
            console.log("Pedimos que complete el campo")
            setMessage("Pedimos que asigne un nombre");
            showModal();
        }else {
            // Si el input no estaba vació ya no subimos modal y podemos guardar
            console.log("GUARDAMOS IF 2")
            if(isUpdate){
                EditarDirec();
                console.log("se edito")
            }
            else{CrearDirec();
            console.log("se guardo")
            }
        }
    }

    /**
     * Funciones iniciales que necesitan un async
     * @date 8/4/2023 - 10:26:53 PM
     * @author Alessandro Guevara
     *
     * @async
     * @returns {*}
     */
    const runStartFunctions = async () => {
        await requestPermissions().then((result) => {
            if(result) {
                if(isUpdate) {
                    reverseGeocodeLocation();
                    getUserLocation();
                    handleCenterMap();  
                }else {
                    getUserLocation();
                }
            }else {
                navigation.goBack();
            }
            
        })

        
    }

    useEffect(() => {
        runStartFunctions();
    }, []); 

    // const onMapReady = useCallback(() => {
    //     setMapReady(true);
    // }, []);
    console.log("console log antes del return de la pantalla")
    return (
        <SafeAreaView style={style.container}>
            <View style={style.containerSearch}>
                <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <TouchableOpacity 
                        style={style.circleIcon}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="close" size={24} color={Palette.colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.6}}>
                    
                </View>
                <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <TouchableOpacity 
                        style={style.circleIcon}
                        onPress={() => handleCenterMap()}
                    >
                        <MaterialIcons name="my-location" size={28} color={Palette.colors.primary} />
                    </TouchableOpacity>
                </View>
                
            </View>
            <MapView 
                ref={mapRef}
                style={style.mapView}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: isUpdate ? 0.0001 : 0.0922,
                    longitudeDelta: isUpdate ? 0.0009 : 0.0421
                }}
                // onRegionChange={handleRegionChange}
                // onRegionChangeComplete={handleRegionChange}
            >
                <Marker 
                    // draggable={true}
                    // onDragEnd={(direction, isGesture) => handleOnDragEnd(direction, isGesture)}
                    coordinate={origin}
                    image={pinPlace}
                    title='Lugar de limpieza'
                >
                    <Callout>
                        <View>
                            <Text>Lugar de limpieza</Text>
                        </View>
                    </Callout>
                </Marker>
                <Marker 
                    coordinate={currentLocation}
                    title='Mi ubicación'
                    pinColor='#557BF1'
                >
                    <Callout>
                        <View>
                            <Text>Mi ubicación</Text>
                        </View>
                    </Callout>
                </Marker>
                
            </MapView>
            
            {/* Imagen que va a estar centrada en la pantalla y servirá como guía para ubicar donde quieres la localización */}
            {/* <Image source={pinPlace} style={style.pinMarker} /> */}

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                
            >
                <View style={style.bottomModalContainer}>
                    {gettingLocation && (
                        <>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Obteniendo ubicación actual...</Text>
                        </>
                    )}

                    {gettingLocation === false && (
                        <>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{infoOrigin.street ? infoOrigin.street : "Via sin nombre"} {infoOrigin.streetNumber ? infoOrigin.streetNumber : "Sin número"}</Text>
                            <Text style={{fontSize: 18, fontStyle: 'italic'}}>{infoOrigin.street ? infoOrigin.street : "Via sin nombre"} {infoOrigin.streetNumber ? infoOrigin.streetNumber : "Sin número"}, {infoOrigin.district}, {infoOrigin.postalCode} {infoOrigin.city}, {infoOrigin.region}. {infoOrigin.country}</Text>
                        </>
                    )}
                    
                </View>
            </BottomSheet>
            <Modal visible={visibleMod} contentContainerStyle={style.modal}>
						<View style={style.modalResponse}>
							<Text style={style.textProgress}>{message}</Text>
							<TouchableOpacity
							style={style.aceptarbtn}
							onPress={() => {
                                if (message === 'Pedimos que asigne un nombre') {
                                  hideModal();
                                } else {
                                  goToDirecciones(); 
                                }
                              }}
							>
								<Text style={style.textaceptar}>Aceptar</Text>
							</TouchableOpacity>
						</View>
					</Modal>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapView: {
        width: '100%',
        height: '100%'
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
    containerSearch: {
        height: 50, 
        marginHorizontal: 16,
        paddingHorizontal: 12,
        borderRadius: 100,
        position: 'absolute', 
        top: Constants.statusBarHeight+10,
        left: 0,
        right: 0,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input:{
        height:40,
        backgroundColor:'transparent',
        color: Palette.colors.white
    },
    circleIcon: {
        backgroundColor: '#fcfeff', 
        width: 38, 
        height: 38, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 50,
    },
    containerBtnSave: {
        alignSelf: 'center'
    },
    btnStyle: {
        marginTop: 20,
        marginBottom: 8,
        padding: 5,
        borderRadius: 30,
        borderColor: Palette.colors.primary,
        backgroundColor: Palette.colors.primary,
        borderWidth: 1,
        width: '100%'
    },
    containerInputName: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#f88'
    },
    inputText:{
        height:40,
        backgroundColor: Palette.colors.white,
        color: Palette.colors.black,
        fontSize: 18,
        borderTopWidth: 0,
        borderTopColor: Palette.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Palette.colors.primary
    },
    modal: {
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
      },
      textProgress: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#05668D",
        textAlign: "center",
      },
      aceptarbtn: {
        backgroundColor: "#05668D",
        padding: 15,
        width: "80%",
        borderRadius: 20,
        marginTop: 20,
      },
      textaceptar: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      modalResponse: {
        textAlign: "center",
        backgroundColor: "white",
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
      },

})

