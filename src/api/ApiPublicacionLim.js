import { View, Text, SafeAreaView } from "react-native";
import React,{useEffect,useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import { URL_API } from "../utils/enviroments";
import PublicacionesLimList from "../components/PublicacionesLim/PublicacionesLimList";
import useAuth from "../hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as Location from "expo-location";
import { getLocationsDistance } from "../helpers/HelpersLocation";
import Loader from './../components/Loader';


export default function ApiPublicacionLim() {
  const [publicacionesLim, setPublicacionesLim] = useState([]);
  const { auth } = useAuth();
  let token = auth.token;
  const role_user = auth.role;
  console.log(auth);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);


  /**
   * Función para obtener la ubicación actual del dispositivo del usuario
   * @date 8/12/2023 - 4:31:47 PM
   * @author Alessandro Guevara
   *
   * @async
   * @returns {Promise resolve} - [true | false | latitude | longitude]
   */
  const getUserLocation = async () => {

      return new Promise(async (resolve) => {
          // Solicitamos permisos para obtener localizacion
          let { status } = await Location.requestForegroundPermissionsAsync();
          if(status !== 'granted') {
              // Si el usuario no permite los permisos no mostraremos el indicador de distancia
              console.log("PERMISOS DENEGADOS");
              const objResp = {
                status: false,
              }
              resolve(objResp);
          }else {
              let location = await Location.getCurrentPositionAsync({
                  accuracy: 6
              });
              
              const objResp = {
                status: true,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }
              resolve(objResp);
          }
      })

      
  }


  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
            setShowLoader(true);
            const response = await axios.get(URL_API+'v1/publicaciones',config);
            const array_pubs = [];

            // Verificamos que el usuario no tenga rol de limpiador para obtener distancia de ubicaciones
            if(role_user != "ROLE_LIMPIADOR") {

              await getUserLocation().then((result) => {
                if(result.status) {
                  const { latitude, longitude } = result;
                  
                  response.data.map(async (pub) => {
                    const latitudeLimpieza = pub.direccion.latitud;
                    const longitudLimpieza = pub.direccion.longitud;

                    // Utilizamos función para obtener distancia
                    await getLocationsDistance(latitude, longitude, latitudeLimpieza, longitudLimpieza).then((resultM) => {
                      // Agregamos el objeto de la publicación con dos nuevos datos: [is_location_available, locations_distance]
                      array_pubs.push({...pub, is_location_available: result.status, locations_distance: resultM})
                    })
                  })
                }else {
                  // Agregamos el objeto de la publicación con dos nuevos datos: [is_location_available, locations_distance]
                  response.data.map((pub) => {
                    array_pubs.push({...pub, is_location_available: result.status, locations_distance: 0})
                  })
                }
              })

            }else {
              response.data.map((pub) => {
                array_pubs.push({...pub, is_location_available: false, locations_distance: 0})
              })
            }

            console.log(array_pubs);
            setPublicacionesLim(array_pubs);
            setShowLoader(false);
        } catch (error) {
            console.error(error);
            setShowLoader(false);
        }

    };
    fetchData();
    }, [])
  );

  const goToCrearPu = () => {
    navigation.navigate("CrearPublicacion");
  };

  return (
    <View style={styles.container}>
      <Loader show={showLoader}/>
      <TouchableOpacity style={styles.floatingButton} onPress={goToCrearPu}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <PublicacionesLimList publicacionesLim={publicacionesLim} />
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 20, // Ajusta la posición vertical
    right: 20, // Ajusta la posición horizontal
    elevation: 5, // Sombra en Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
