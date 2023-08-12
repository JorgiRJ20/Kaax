import {View, Alert,Text, StyleSheet, Button, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity,} from 'react-native'
import React,{useEffect,useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { URL_API } from '../utils/enviroments';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function (props) {

    const goToPublicaciones = () => {
        navigation.navigate("Tab");
    }
    
        const navigation = useNavigation();

    const {route:{params}} = props
    

    const [modificado, setModificado] = useState({
        idPublicacion:'',
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

    useEffect(() => {
        cargaPublicacion()
        return () =>
        setModificado({
        idPublicacion:'',
        titulo: '',
        descripcion:'',
        numCuartos:'',
        pago: '',
        status:'',
        user:{
            idUser:''
        },
        direccion:{
          idDireccion:''
        }
            });
        }, []);

        const cargaPublicacion = async () => {
            var id = params.idPublicacion;
            var titulo = params.titulo;
            var descripcion = params.descripcion;
            var numCuartos = params.numCuartos;
            var pago = params.pago;
            var status = params.status;
            var idDireccion = params.direccion;
            setModificado({
                idPublicacion: id,
                titulo: titulo,
                descripcion: descripcion,
                numCuartos: numCuartos,
                pago: pago,
                status: status,
                direccion:{
                    idDireccion: idDireccion
                  },
                user:{
                    idUser: idUser
                },
            });
        };

const { auth } = useAuth();
        
let token = auth.token;
let idUser = auth.idUser;
const config = {
  headers: { Authorization: `Bearer ${token}` }
};



const EditarPub = async () => {

    if (
        modificado.titulo < 1 ||
        modificado.descripcion.length < 1 ||
        modificado.numCuartos.length < 1 ||
        modificado.pago.length < 1 ||
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
              await axios.put(URL_API+'v1/publicaciones/'+params.idPublicacion,{
                idPublicacion: modificado.idPublicacion,
                titulo: modificado.titulo,
                descripcion:modificado.descripcion,
                numCuartos:modificado.numCuartos,
                pago: modificado.pago,
                fechaTrabajo: almacenafecha,
                horaTrabajo: almacenaHora,
                status: modificado.status,
                user:{
                    idUser: idUser
                },
                direccion:{
                  idDireccion:modificado.direccion.idDireccion,
                }
            },config);
        } catch (error) {
            console.error(error);
        }
        Alert.alert(
            '¡Exito!',
            'Publicación Editada ',[
                {text: 'OK', onPress: goToPublicaciones},]
          );
}
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [almacenafecha, setalmacenafecha] = useState(params.fechaTrabajo);
    const [almacenaHora, setalmacenaHora] = useState(params.horaTrabajo);
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
        
          <Text style={styles.titulo}>Editar Publicación</Text>
          <Text style={styles.labelS}>Titulo</Text>
          <View style={styles.container}>
              <TextInput
                placeholder="Ingresa un titulo"
                style={styles.inputText}
                autoCapitalize="none"
                value={modificado.titulo}
                              onChangeText={(e) =>
                                setModificado({
                                      ...modificado,
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
                value={modificado.descripcion}
                              onChangeText={(e) =>
                                setModificado({
                                      ...modificado,
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
                value={modificado.numCuartos+''}
                              onChangeText={(e) =>
                                setModificado({
                                      ...modificado,
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
                value={modificado.pago+''}
                              onChangeText={(e) =>
                                 setModificado({
                                      ...modificado,
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
        <Text>{modificado.horaTrabajo}</Text>
  
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
                    EditarPub();
                  }}
                >
                  <Icon name="edit" color={'#fff'} size={28}/>
                  <Text style={styles.textTouchable}>Editar Publicación</Text>
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
          marginStart:6
        },
        buttontime: {
          width: 150,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection:'row',
          backgroundColor: '#006E90',
          color: '#090808',
          marginTop: 15,
          alignItems: "center",
        },
        buttonText: {
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
          marginStart:10
        },
  })