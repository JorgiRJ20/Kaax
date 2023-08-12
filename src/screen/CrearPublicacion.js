import {View, Alert,Text, StyleSheet, Button, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity,} from 'react-native'
import React,{useEffect,useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { URL_API } from '../utils/enviroments';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

export default function CrearPublicacion() {

  const navigation = useNavigation();

  const goToPubli = () => {
    navigation.navigate('Tab');
   };

  const [publicacion, setPublicacion] = useState({
    titulo: '',
    descripcion:'',
    numCuartos:'',
    pago: '',
    fechaTrabajo:'',
    horaTrabajo:'',
    status:'',
    user:{
        idUser:''
    },
    direccion:{
      idDireccion:'' 
    }
});

/*
    Creamos un efecto para que al salir, 
    se inicie el state con los datos defecto
    */
    useEffect(() => {
    return () =>
    setPublicacion({
    titulo: '',
    descripcion:'',
    numCuartos:'',
    pago: '',
    status:'',
    user:{
        idUser:1
    },
    direccion:{
      idDireccion:3 
    }
        });
    }, []);

const { auth } = useAuth();
let token = auth.token;
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const CrearPub = async () => {
  if (
    publicacion.titulo < 1 ||
    publicacion.descripcion.length < 1 ||
    publicacion.numCuartos.length < 1 ||
    publicacion.pago.length < 1 ||
    almacenafecha == 0 ||
    almacenaHora == 0
  ) {
    Alert.alert(
      '¡ERROR!',
      'Ingresa todos los datos'
    );
    return;
  }
       try {
              await axios.post(URL_API+'v1/publicaciones', {
                titulo: publicacion.titulo,
                descripcion:publicacion.descripcion,
                numCuartos:publicacion.numCuartos,
                pago: publicacion.pago,
                fechaTrabajo: almacenafecha,
                horaTrabajo:almacenaHora,
                status:1,
                user:{
                    idUser:1
                },
                direccion:{
                  idDireccion:3,
                }
            },config);
        } catch (error) {
            console.error(error);
        }
        Alert.alert(
          '¡Exito!',
          'Publicación Agregada ',[
              {text: 'OK', onPress: goToPubli},]
        );
}
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [almacenafecha, setalmacenafecha] = useState(0);
  const [almacenaHora, setalmacenaHora] = useState(0);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);

    let tempDate = new Date(currentDate);
    const dia = tempDate.getDate();
    const mes = tempDate.getMonth() + 1;
    const anio = tempDate.getFullYear();

    const hora = tempDate.getHours();
    const minuto = tempDate.getMinutes();
    setalmacenaHora(`${hora}:${minuto}:00`)
    if(mes < 10){
      if(dia < 10){
        setalmacenafecha(`${anio}-0${mes}-0${dia}`)
      }
      else{setalmacenafecha(`${anio}-0${mes}-${dia}`)}
    }
    else{
        if(dia < 10){
          setalmacenafecha(`${anio}-${mes}-0${dia}`)
          }
         else{setalmacenafecha(`${anio}-${mes}-${dia}`)}
    }
    console.log('adadas'+ date.toLocaleString())
  };
  

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [datePickerVisible, setDatePickerVisible] = React.useState(
    Platform.OS === 'ios' ? true : false
  );
  return (
    <ScrollView style={styles.containerScroll}>
      
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
									['titulo']: e,
								})
							}/>
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
									['descripcion']: e,
								})
							}/>
        </View>
        <Text style={styles.labelS}>Numero de cuartos</Text>
        <View style={styles.container}>
            <TextInput
              placeholder="Ingresa el numero de cuartos"
              style={styles.inputText}
              autoCapitalize="none"
              value={publicacion.numCuartos}
							onChangeText={(e) =>
								setPublicacion({
									...publicacion,
									['numCuartos']: e,
								})
							}/>
        </View>
        <Text style={styles.labelS}>Ingresa el pago</Text>
        <View style={styles.container}>
            <TextInput
              placeholder="Ingresa el pago"
              style={styles.inputText}
              autoCapitalize="none"
              value={publicacion.pago}
							onChangeText={(e) =>
								setPublicacion({
									...publicacion,
									['pago']: e,
								})
							}/>
        </View>
        <Text style={styles.labelS}>Ingresa el dia del trabajo</Text>
        {/*<View style={styles.container}>
        {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          display='default'
          onChange={onChange}
        />
      )}
        <Button title='MOSTRAR DATEPICKER' onPress={() => showMode('date')} />
      {datePickerVisible && (
        <DateTimePicker
          display='default'
          value={new Date()}
          onChange={(e) => {
            Platform.OS !== 'ios' ? setDatePickerVisible(false) : null;
            console.log(e.nativeEvent);
            
          }}
        />
      )}
      <Text>{almacenafecha}</Text>
        </View>*/}
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttontime} onPress={showDatepicker}>
            <Icon name="calendar" color={'#fff'} size={17}/>
			      <Text style={styles.buttonText}>Abir calendario</Text>
            </TouchableOpacity>
            <TextInput
              placeholder=""
              style={styles.inputText}
              autoCapitalize="none"
              value={almacenafecha}
              editable={false}/>
        </View>

        <Text style={styles.labelS}>Ingresa la hora del trabajo</Text>
        
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttontime} onPress={showTimepicker}>
            <Icon name="clock-o" color={'#fff'} size={20}/>
			      <Text style={styles.buttonText}>Abrir reloj</Text>
            </TouchableOpacity>
            <TextInput
              placeholder=""
              style={styles.inputText}
              autoCapitalize="none"
              value={almacenaHora}
              editable={false}/>

        </View>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          timeZoneOffsetInSeconds={3600}
          onChange={onChange}
        />
      )}
      <Text>{almacenafecha}</Text>
      <Text>{publicacion.horaTrabajo}</Text>

      <TouchableOpacity
                style={{
                  backgroundColor:"#05668D",
                  padding: 10,
                  borderRadius: 20,
                  marginBottom: 40,
                  marginTop: 20,
                  marginRight: 40,
                  marginLeft: 40,
                  flexDirection:'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                // style={styles.btnTouchable}
                onPress={() => {
                  CrearPub();
                }}
              >
                <Icon name="arrow-circle-up" color={'#fff'} size={30}/>
                <Text style={styles.textTouchable}>Publicar</Text>
              </TouchableOpacity>
        
    </ScrollView>
  )
}
const styles = StyleSheet.create({
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
     textAlign:'center'
    },
    labelS: {
        fontSize: 16,
        color: "#05668D",
        marginBottom: -10,
        textAlign: "left",
        padding: 10,
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
        marginStart:6,
      },
      buttontime: {
        width: 150,
        height: 40,
        borderRadius: 20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006E90',
        color: '#090808',
        marginTop: 15,
        alignItems: "center",
      },
      buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginStart:8,
      },
})