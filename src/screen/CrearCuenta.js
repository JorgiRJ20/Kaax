import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import ButtonLogin from "../components/ButtonLogin";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";

export default function CrearCuenta(props) {
  const [checked, setChecked] = React.useState(null);
  const [imageUri, setImageUri] = useState("");
  const [fileBlob, setFileBlob] = useState("");
  const [fileName, setFileName] = useState("");

  const { navigation } = props;
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(true)
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    email: Yup.string()
      .required(true)
      .email("Ingresa un correo válido" ),
    password: Yup.string()
      .required(true)
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])/, // Al menos una letra minúscula
        "La contraseña debe tener al menos una letra minúscula"
      )
      .matches(
        /^(?=.*[A-Z])/, // Al menos una letra mayúscula
        "La contraseña debe tener al menos una letra mayúscula"
      )
      .matches(
        /^(?=.*[0-9])/, // Al menos un número
        "La contraseña debe tener al menos un número"
      )
      .matches(
        /^(?=.*[!@#$%^&*])/, // Al menos un caracter especial
        "La contraseña debe tener al menos un caracter especial"
      ),
    phone: Yup.string()
      .required(true)
      .min(10, "El número debe tener al menos 10 caracteres")
      .max(10, "El número debe tener maximo 10 caracteres"),
    role: Yup.string()
      .required(true)
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  };

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const fileUri = result.assets[0].uri;
      const fileName = fileUri.substring(fileUri.lastIndexOf("/") + 1);

      try {
        // Obtener los datos del archivo como un blob utilizando fetch
        const fileResponse = await fetch(fileUri);
        const fileBlob = await fileResponse.blob();

        // Mostrar la imagen seleccionada sin subirla a Firebase Storage
        setImageUri(fileUri);

        // Guardar la imagen en una variable para subirla posteriormente
        setFileBlob(fileBlob);
        setFileName(fileName);
      } catch (error) {
        console.error("Error al leer el archivo:", error);
      }
    } else {
      console.log(result);
    }
  };

  const handleUser = (values) => {
    console.log(values)
    console.log('dasdasd')
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.containerScroll}>
      <SafeAreaView></SafeAreaView>

      <View style={styles.container}>
        <Image source={require("../assets/kaax.png")} style={styles.image} />
        <Text style={styles.titulo}>Crear Cuenta</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue, isValid }) => (
            <View>
                <Text style={styles.labelS}>Nombre</Text>
                <TextInput
                  placeholder="Ingresa tu nombre"
                  style={styles.inputText}
                  autoCapitalize="none"
                  onChangeText={handleChange("name")}
                  value={values.name}
                  onBlur={handleBlur("name")}
                />
                <Text style={styles.error}>{errors.name}</Text>
                <Text style={styles.labelS}>Email</Text>
                <TextInput
                  placeholder="Ingresa tu correo electronico"
                  style={styles.inputText}
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                />
                <Text style={styles.error}>{errors.email}</Text>
                <Text style={styles.labelS}>Contraseña</Text>
                <TextInput
                  placeholder="Ingresa tu contraseña"
                  style={styles.inputText}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                />
                <Text style={styles.error}>{errors.password}</Text>
                <Text style={styles.labelS}>Telefono</Text>
                <TextInput
                  placeholder="Ingresa tu número de telefono"
                  style={styles.inputText}
                  autoCapitalize="none"
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  onBlur={handleBlur("phone")}
                />
                <Text style={styles.error}>{errors.phone}</Text>
                <Text style={styles.labelS}>Elige tu rol</Text>

                <View style={styles.containerSelect}>
                  <Text style={styles.labelSelect}>Solicitante</Text>
                  <RadioButton
                    value="first"
                    status={values.role === "first" ? "checked" : "unchecked"}
                    onPress={() => setFieldValue("role", "first")}
                  />
                  <Text style={styles.labelSelect}>Limpiador</Text>
                  <RadioButton
                    value="second"
                    status={values.role === "second" ? "checked" : "unchecked"}
                    onPress={() => setFieldValue("role", "second")}
                  />
                </View>
                <Text style={styles.labelS}>Foto de perfil</Text>
                <View style={styles.imageContainer}>
                  {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                  ) : (
                    <Image
                      source={require("../assets/images/perfil.png")}
                      style={styles.image}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleChooseImage}
                    
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
              </View>
              <TouchableOpacity
              style={{ backgroundColor: isValid ? '#05668D' : '#A0A0A0', padding: 10, borderRadius: 10,marginBottom: 20,marginTop: 20 }}
                // style={styles.btnTouchable}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.textTouchable}>Registrarme</Text>
              </TouchableOpacity>
              
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  error: {
    textAlign: "center",
    color: "#DA5045",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
  },
  titulo: {
    fontSize: 30,
    color: "#05668D",
    fontWeight: "bold",
    marginTop: -30,
  },
  labelS: {
    fontSize: 16,
    color: "#05668D",
    marginTop: 10,
    marginBottom: -10,
    textAlign: "left",
    padding: 10,
  },
  inputText: {
    height: 60,
    width: 350,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
    paddingStart: 20,
  },
  image: {
    width: 210,
    height: 210,
  },
  btnTouchable: {
    width: 260,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006E90",
    marginTop: 15,
    marginBottom: 20,
  },
  textTouchable: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    marginTop: 10,
  },
  labelSelect: {
    fontSize: 16,
    color: "#05668D",
    textAlign: "left",
    padding: 10,
  },
  //   Estilos de la imagen de perfil
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: 200,
    height: 150,
    aspectRatio: 1,
    borderRadius: 90,
  },
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 100,
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  addButtonText: {
    color: "#000",
    fontSize: 30,
  },
});
