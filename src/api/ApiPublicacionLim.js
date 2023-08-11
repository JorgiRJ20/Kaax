import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../utils/enviroments";
import PublicacionesLimList from "../components/PublicacionesLim/PublicacionesLimList";
import useAuth from "../hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
export default function ApiPublicacionLim() {
  const [publicacionesLim, setPublicacionesLim] = useState([]);
  const { auth } = useAuth();
  let token = auth.token;
  console.log(auth);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_API + "v1/publicaciones", config);
        setPublicacionesLim(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const goToCrearPu = () => {
    navigation.navigate("CrearPublicacion");
  };

  return (
    <View style={styles.container}>
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
