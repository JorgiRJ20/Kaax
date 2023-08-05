import {View, Text, StyleSheet, Button, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity,} from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CrearPublicacion() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [almacenafecha, setalmacenafecha] = useState(0);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);

    let tempDate = new Date(currentDate);
    const dia = tempDate.getDate();
    const mes = tempDate.getMonth() + 1;
    const anio = tempDate.getFullYear();
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
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
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
              autoCapitalize="none"/>
        </View>
        <Text style={styles.labelS}>Descripción</Text>
        <View style={styles.container}>
            <TextInput
              placeholder="Ingresa la descripción"
              style={styles.inputText}
              autoCapitalize="none"/>
        </View>
        <Text style={styles.labelS}>Numero de cuartos</Text>
        <View style={styles.container}>
            <TextInput
              placeholder="Ingresa el numero de cuartos"
              style={styles.inputText}
              autoCapitalize="none"/>
        </View>
        <Text style={styles.labelS}>Ingresa el pago</Text>
        <View style={styles.container}>
            <TextInput
              placeholder="Ingresa el pago"
              style={styles.inputText}
              autoCapitalize="none"/>
        </View>
        <Text style={styles.labelS}>Ingresa el dia del trabajo</Text>
        <View style={styles.container}>
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
        </View>

        <DateTimePicker
          testID='dateTimePicker'
          value={new Date()}
          mode='time'
          display='default'
          is24Hour={true}
          onChange={onChange}
        />
        
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
})