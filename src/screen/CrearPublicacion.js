import {
  View,
  Alert,
  Text,
  StyleSheet,
  Se,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform
} from "react-native";
import React,{useEffect,useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { URL_API } from "../utils/enviroments";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../utils/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import { Modal } from 'react-native-paper';

export default function CrearPublicacion() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [statusUploadImg, setStatusUploadImg] = useState(false);
  const [statusUploadImgs, setStatusUploadImgs] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [visibleMod, setVisibleMod] = React.useState(false);

  const showModal = () => setVisibleMod(true);
  const hideModal = () => setVisibleMod(false);	

  

  // funcion para subir una imagen
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [fileBlob, setFileBlob] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
    // funcion para subir varias imagenes
    const [selectedImages, setSelectedImages] = React.useState([]);
    const [arrayImagenes, setArrayImagenes] = useState([]); // Array de URLs de las imágenes subidas
  const goToPubli = () => {
    navigation.navigate("Tab");
  };

  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    numCuartos: "",
    pago: "",
    fechaTrabajo: "",
    horaTrabajo: "",
    status: "",
    user: {
      idUser: "",
    },
    direccion: {
      idDireccion: "",
    },
  });

  /*
    Creamos un efecto para que al salir, 
    se inicie el state con los datos defecto
    */

    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(URL_API + "v1/direcciones", config);
            let direccionesFil = [];
            response.data.map((item) => {
              if (item.user.idUser == idUser) {
                const objUbi = {
                  key: item.idDireccion,
                  value: `${item.nameDireccion} \n(${item.calle} ${item.numExt})`,
                };
                direccionesFil.push(objUbi);
              }
            });
            //Set Data Variable
            setData(direccionesFil);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [])
    );


  useEffect(() => {
    return () =>
      setPublicacion({
        titulo: "",
        descripcion: "",
        numCuartos: "",
        pago: "",
        status: "",
        user: {
          idUser: "",
        },
        direccion: {
          idDireccion: "",
        },
      });
  }, []);

  const { auth } = useAuth();
  let token = auth.token;
  let idUser = auth.idUser;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const CrearPub = async () => {
    try {
      setVisible(true);
    if (
      publicacion.titulo < 1 ||
      publicacion.descripcion.length < 1 ||
      publicacion.numCuartos.length < 1 ||
      publicacion.pago.length < 1 ||
      almacenafecha == 0 ||
      almacenaHora == 0 ||
      imageUri == null ||
      selectedImages.length < 1
      
    ) {
      
      setMessage("Ingresa todos los datos");
      showModal();
      setVisible(false);
      //Alert.alert("¡ERROR!", "Ingresa todos los datos");
      return;
    }

    handleUploadImage();

    } catch (error) {
     /* Alert.alert("Error!", "Ocurrio un error al crear la publicación", [
        { text: "OK", onPress: goToPubli },
      ]);*/
      setMessage("Error al registrar usuario");
      showModal();
      console.error(error.config.data);
    }

  };
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [almacenafecha, setalmacenafecha] = useState(0);
  const [almacenaHora, setalmacenaHora] = useState(0);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    setDate(currentDate);

    let tempDate = new Date(currentDate);
    const dia = tempDate.getDate();
    const mes = tempDate.getMonth() + 1;
    const anio = tempDate.getFullYear();

    const hora = tempDate.getHours();
    const minuto = tempDate.getMinutes();
    setalmacenaHora(`${hora}:${minuto}:00`);
    if (mes < 10) {
      if (dia < 10) {
        setalmacenafecha(`${anio}-0${mes}-0${dia}`);
      } else {
        setalmacenafecha(`${anio}-0${mes}-${dia}`);
      }
    } else {
      if (dia < 10) {
        setalmacenafecha(`${anio}-${mes}-0${dia}`);
      } else {
        setalmacenafecha(`${anio}-${mes}-${dia}`);
      }
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleNavigateLocations = () => {
    navigation.navigate("AddLocation",{});
  }

  const showDatepicker = () => {
    showMode("date");
  };


  // funcion anterior para subir una imagen
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
      console.log("No se ha seleccionado ninguna imagen");
    }
  };
  // Función para subir la imagen a Firebase Storage y actualizar el enlace en el servidor
  const handleUploadImage = async () => {
    try {
      // Verificar si hay una imagen seleccionada para subir
      if (fileBlob && fileName) {
        // Crear una referencia al archivo en Firebase Storage
        const filePath = `usuarios/${fileName}`;
        const storageRef = ref(storage, filePath);

        // Subir el blob al Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, fileBlob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observar eventos de cambio de estado como progreso, pausa y reanudación
            // Obtener el progreso de la tarea, incluyendo el número de bytes subidos y el número total de bytes a subir
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Manejar errores de subida fallida
            console.error("Error al subir la imagen:", error);
          },
          () => {
            // Manejar subida exitosa en la finalización
            // Por ejemplo, obtener la URL de descarga: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

              // Actualizar la URL de la imagen en tu estado
              setImageUri(downloadURL);
              // Llamar a handleregister con la nueva imagen
              savePublicacion(downloadURL);
            });
          }
        );
      } else {
        console.log("No se ha seleccionado ninguna imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  // funcion para eliminar una imagen
  const removeImage = () => {
    setImageUri(null);
    setFileBlob("");
    setFileName("");
  };

const savePublicacion = async (url) => {
  try {
    const response = await axios.post(
      URL_API + "v1/publicaciones",
      {
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        numCuartos: publicacion.numCuartos,
        pago: publicacion.pago,
        fechaTrabajo: almacenafecha,
        horaTrabajo: almacenaHora,
        status: 1,
        user: {
          idUser: idUser,
        },
        direccion: {
          idDireccion: selected,
        },
        imagenUrl: url
      },
      config
    );
    if(response){
      handleUploadImages(response.data);
    }

  } catch (error) {
    console.error(error);
   /* Alert.alert("Error!", "Ocurrió un error al crear la publicacion", [
      { text: "OK", onPress: goToPubli },
    ]);*/
    setMessage("ocurrió un error al crear la publicacion");
    showModal();
  }
};

  const handleChooseImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!results.canceled) {
      const selectedImages = results.assets;
  
      const imageInfoArray = [];
  
      try {
        for (const image of selectedImages) {
          const fileUri = image.uri;
          const fileName = fileUri.substring(fileUri.lastIndexOf("/") + 1);
  
          // Obtener los datos del archivo como un blob utilizando fetch
          const fileResponse = await fetch(fileUri);
          const fileBlob = await fileResponse.blob();
  
          const imageInfo = {
            name: fileName,
            blob: fileBlob,
            uri: fileUri,
          };
  
          imageInfoArray.push(imageInfo);
        }
  
        // Actualizar el estado con el array de información de imágenes
        setSelectedImages(imageInfoArray);
      } catch (error) {
        console.error("Error al leer los archivos:", error);
      }
    } else {
      console.log("Selection cancelled");
    }
  };
  
  const handleRemoveImage = (imageUri) => {
    const newSelectedImages = selectedImages.filter(
      (image) => image.uri !== imageUri
    );
    setSelectedImages(newSelectedImages);
  };

  const handleShowImage = (url) => {
    navigation.navigate("ShowImages", {
        arrayImages: selectedImages,
        indexShow: 1,
        howShow: 'onlyImage',
        uriUrl: url,
    });
  }

  useEffect(() => {
  }, [imagenesUrl]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
      style={{ marginHorizontal: 10, borderRadius: 15 }} 
      onPress={() => handleShowImage(item.uri)}
    >
      <Image source={{ uri: item.uri }} style={{ width: 150, height: 150, borderRadius: 15 }} />
      <TouchableOpacity
        onPress={() => handleRemoveImage(item.uri)}
        style={{ marginTop: 5, alignItems: "center" }}
      >
        <Icon name="trash" color={"#ba181b"} size={35} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  // funcion para subir las imagenes a firebase y obtener la url
  const [imagenesUrl, setImagenesUrl] = useState([]); // Array de URLs de las imágenes subidas
  const handleUploadImages = async (idPublic) => {
    try {
      if (selectedImages.length > 0) {
        // Iterar sobre las imágenes seleccionadas y subirlas una por una
        for (let image of selectedImages) {
   

          let filePath = `usuarios/${image.name}`;
          let storageRef = ref(storage, filePath);

          let uploadTask = uploadBytesResumable(storageRef, image.blob);

          await new Promise((resolve, reject) => {
            console.log("Subiendo imagen...");
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Observar el progreso de la subida si es necesario
              },
              (error) => {
                console.error("Error al subir la imagen:", error);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    // Aquí puedes hacer algo con la URL de descarga si es necesario
                    console.log({ url: downloadURL, idPubli: idPublic }, "array nuevo");
                    arrayImagenes.push({ imagenUrl: downloadURL, publicacion: { idPublicacion :idPublic} });
                    resolve();
                  })
                  .catch((error) => {
                    console.error(
                      "Error al obtener la URL de descarga:",
                      error
                    );
                    reject(error);
                  });
              }
            );
          });
        }

        // Todas las imágenes han sido subidas
        console.log("Todas las imágenes han sido subidas");
        saveImagenesBD();
      } else {
        console.log("No se han seleccionado imágenes");setPublicacion
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
    }

  };



  const saveImagenesBD = async () => {
    try {
      for (const imagen of arrayImagenes) {
        saveImagen(imagen);
      }
  
      setVisible(false);
      /*Alert.alert("¡Éxito!", "Publicación registrada con exito", [
        { text: "OK", onPress: goToPubli },
      ]);*/
      
      setMessage("Publicación registrada correctamente");
      showModal();
    } catch (error) {
      console.log(error, "Ocurrió un error al guardar las imágenes")
      setVisible(false);
      /*Alert.alert("Error!", "Ocurrió un error al guardar las imágenes", [
        { text: "OK", onPress: goToPubli },
      ]);*/
      setMessage("Ocurrió un error al guardar las imágenes");
      showModal();
    }
  };

  const saveImagen = async (imagen) => {
    try {
      const response = await axios.post(URL_API + "imagenes", imagen, config);
      console.log(response.data);
    } catch (error) {
      console.error("Error al guardar imagen:", error);
      // Puedes manejar el error aquí
    }
  };


  return (
    <ScrollView style={styles.containerScroll}>
      <Loader show={visible} />
      <Text style={styles.titulo}>Crear Publicación</Text>
      <Text style={styles.labelS}>Titulo</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Ingresa un titulo"
          style={styles.inputText}
          autoCapitalize="none"
          value={publicacion.titulo}
          onChangeText={(e) =>
            setPublicacion({
              ...publicacion,
              ["titulo"]: e,
            })
          }
        />
      </View>
      <Text style={styles.labelS}>Descripción</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Ingresa la descripción"
          style={styles.inputText}
          autoCapitalize="none"
          value={publicacion.descripcion}
          onChangeText={(e) =>
            setPublicacion({
              ...publicacion,
              ["descripcion"]: e,
            })
          }
        />
      </View>
      <Text style={styles.labelS}>Numero de cuartos</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Ingresa el numero de cuartos"
          style={styles.inputText}
          autoCapitalize="none"
          keyboardType="numeric"
          value={publicacion.numCuartos}
          onChangeText={(e) =>
            setPublicacion({
              ...publicacion,
              ["numCuartos"]: e,
            })
          }
        />
      </View>
      <Text style={styles.labelS}>Ingresa el pago</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Ingresa el pago"
          style={styles.inputText}
          autoCapitalize="none"
          keyboardType="numeric"
          value={publicacion.pago}
          onChangeText={(e) =>
            setPublicacion({
              ...publicacion,
              ["pago"]: e,
            })
          }
        />
      </View>
      <Text style={styles.labelS}>Ingresa el dia del trabajo</Text>
      <View style={styles.container}>
        {Platform.OS == "android" && (
          <TouchableOpacity style={styles.buttontime} onPress={showDatepicker}>
            <Icon name="calendar" color={"#fff"} size={17} />
            <Text style={styles.buttonText}>Abir calendario</Text>
          </TouchableOpacity>
        )}
        <TextInput
          placeholder=""
          style={styles.inputText}
          autoCapitalize="none"
          value={almacenafecha}
          editable={false}
        />
      </View>

      <Text style={styles.labelS}>Ingresa la hora del trabajo</Text>

      <View style={styles.container}>
        {Platform.OS == "android" && (
          <TouchableOpacity style={styles.buttontime} onPress={showTimepicker}>
            <Icon name="clock-o" color={"#fff"} size={20} />
            <Text style={styles.buttonText}>Abrir reloj</Text>
          </TouchableOpacity>
        )}
        
        <TextInput
          placeholder=""
          style={styles.inputText}
          autoCapitalize="none"
          value={almacenaHora}
          editable={false}
        />
      </View>
      {show && Platform.OS == "android" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          timeZoneOffsetInSeconds={3600}
          onChange={onChange}
        />
      )}

      {Platform.OS == "ios" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          timeZoneOffsetInSeconds={3600}
          onChange={onChange}
        />
      )}

      {data.length > 0 && (
        <>
        <Text style={{ ...styles.labelS, marginBottom: 8 }}>
          Ingresa la direccion del trabajo
        </Text>
        <View style={styles.container}>
          <SelectList
            placeholder="Elige la dirección"
            boxStyles={styles.selector}
            dropdownStyles={{ borderColor: "#05668D" }}
            setSelected={setSelected}
            data={data}
            dropdownTextStyles={{ fontSize: 14 }}
          />
        </View>
        </>
      )}

      {data.length === 0 && (
        <View>
        <Text style={{ ...styles.labelS, marginBottom: 8, color: "#ba181b" }}>
          Sin lugares de limpieza registrados
          
        </Text>
          <TouchableOpacity style={styles.buttonGoLocations} onPress={handleNavigateLocations}>
            <Icon name="location-arrow" color={"#fff"} size={20} />
            <Text style={styles.buttonText}>Registrar nuevo lugar de limpieza</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Text style={{ ...styles.labelS, marginBottom: 8 }}>
        Ingresa la foto de portada
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {imageUri ? (
          <>
            <TouchableOpacity onPress={() => handleShowImage(imageUri)}>

              <Image
                source={{ uri: imageUri }}
                style={{ width: 250, height: 200, borderRadius: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeImage()}
              style={{ marginTop: 5, alignItems: "center" }}
            >
              <Icon name="trash" color={"#ba181b"} size={35} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={handleChooseImage}
            disabled={buttonDisabled}
            style={{
              backgroundColor: "#05668D",
              padding: 10,
              borderRadius: 10,
              marginBottom: 40,
              marginTop: 20,
              marginRight: 40,
              marginLeft: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="image" color={"#F8F9FA"} size={40} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{ ...styles.labelS, marginBottom: 8 }}>
        Ingresa las imagenes de la zona a limpiar
      </Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={selectedImages}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
          horizontal
          contentContainerStyle={{ paddingVertical: 10 }}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity onPress={handleChooseImages}>
          <Icon name="image" color={"#05668D"} size={50} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#05668D",
          padding: 10,
          borderRadius: 20,
          marginBottom: 40,
          marginTop: 20,
          marginRight: 40,
          marginLeft: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        // style={styles.btnTouchable}
        onPress={() => {
          CrearPub();
        }}
      >
        <Icon name="arrow-circle-up" color={"#fff"} size={30} />
        <Text style={styles.textTouchable}>Publicar</Text>
      </TouchableOpacity>
      <Modal visible={visibleMod} contentContainerStyle={styles.modal}>
						<View style={styles.modalResponse}>
							<Text style={styles.textProgress}>{message}</Text>
							<TouchableOpacity
							style={styles.aceptarbtn}
							onPress={() => {
                if (message === 'Ingresa todos los datos' || message === 'Error al registrar usuario'
                    || message === 'ocurrió un error al crear la publicacion' || message === 'Ocurrió un error al guardar las imágenes' ) {
                  hideModal();
                } else {
                  goToPubli(); 
                }
              }}
							>
								<Text style={styles.textaceptar}>Aceptar</Text>
							</TouchableOpacity>
						</View>
					</Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  modal: {
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  containerScroll: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    color: "#05668D",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  selector: {
    height: 60,
    width: 350,
    borderColor: "#05668D",
  },
  labelS: {
    fontSize: 16,
    color: "#05668D",
    marginBottom: -10,
    textAlign: "left",
    padding: 10,
    marginLeft: 20,
    marginTop: 10,
  },
  inputText: {
    height: 60,
    width: 350,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
    paddingStart: 20,
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textTouchable: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginStart: 6,
  },
  buttontime: {
    width: 150,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006E90",
    color: "#090808",
    marginTop: 15,
    alignItems: "center",
  },
  buttonGoLocations: {
    width: 280,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006E90",
    color: "#090808",
    marginTop: 15,
    alignItems: "center",
    alignSelf: 'center',
    paddingHorizontal: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginStart: 8,
  },
  modal: {
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop:520,
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
});
