import { View, Text, StyleSheet, Button, Image, TextInput} from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ButtonLogin from '../components/ButtonLogin';

const MySelect2 = () => {
	const [selectedValue, setSelectedValue] = useState(null);
  
	const handleValueChange = (value) => {
	  setSelectedValue(value);
	};
  
	return (
	  <RNPickerSelect
		onValueChange={handleValueChange}
		items={[
		  { label: 'Persona de limpieza', value: 'opcion1' },
		  { label: 'Persona que require el servicio', value: 'opcion2' },
		]}
		value={selectedValue}
		placeholder={{ label: 'Seleccione una opción', value: null }}
	  />
	);
  };

export default function CrearCuenta(props) {

	const { navigation } = props;
	const goToLogin = () => {
		navigation.navigate('Login');
	};
	return (
        <View style={styles.container}>
            
            <Image
                source={require('../assets/kaax.png')}
                style={styles.image}
            />
           <Text style={styles.titulo}>Crear Cuenta K'áax</Text>
                        <Text style={styles.subTitulo}>Necesitamos saber de ti</Text>  
          <TextInput
                placeholder='Nombre(s)'
                style={styles.inputText}
                autoCapitalize='none'
                
          />
          <TextInput
                placeholder='Apellido'
                style={styles.inputText}
                autoCapitalize='none'
                
          />
            <TextInput
                placeholder='Correo Electronico'
                style={styles.inputText}
                autoCapitalize='none'
                
          />
          <TextInput
                placeholder='Contraseña'
                style={styles.inputText}
                autoCapitalize='none'
                secureTextEntry={true}
                
          />
         
         
          <View style={styles.inputText}>
            <Text>¿Quién soy?</Text>
            <MySelect2 />
        </View>
        <ButtonLogin 
					
					title='Registrarme '
				/>
          <Button onPress={goToLogin} title='Iniciar Sesión' />
                       
                    
                    
         
          
        </View>
      )
}
const styles = StyleSheet.create({
    container:{
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
	justifyContent: 'center',
    height: '110%',
    
    },
   
    title:{
        textAlign: 'center',
        fontSize:20,
        fontWeight:'bold',
        marginTop: 80,
        marginBottom: 40,
        marginTop:200,
        color:'#3A628F'
    },
    input:{
        height:60,
        margin:40,
        width:'80%',
        backgroundColor:'#fff',
        borderRadius:30,
        padding:10,
        marginTop:-15,
        paddingStart:20
    },
    error: {
        textAlign:'center',
        color: '#DA5045',
        fontWeight:'bold',
        fontSize:15,
        marginTop:5
    },
    
	containerSvg: {
		marginTop: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fondoLogin: {
		top: -10,
	},
	containerForm: {
		flex: 1,
		marginTop: -250,
		justifyContent: 'center',
		alignItems: 'center',
	},
	centeredContent: {
		marginTop: 100,
		alignItems: 'center',
	},
	titulo: {
		fontSize: 30,
		color: '#99C24D',
		fontWeight: 'bold',
        marginTop:-30,
	},
	subTitulo: {
		fontSize: 15,
		color: '#000000',
	},
	inputText: {
		height: 60,
		width: 350,
		backgroundColor: '#F8F8F8',
		borderRadius: 20,
		padding: 15,
		marginTop: 10,
		paddingStart: 20,
	},
	text2: {
		fontSize: 15,
		color: '#848484',
		marginTop: 15,
		
        color: '#006E90'
	},
	text3: {
		fontSize: 15,
		color: '#848484',
		marginTop: 90,
		marginBottom: -100,
		marginRight: -20,
	},
	boldText: {
		fontWeight: 'bold',
		color: '#7D55A0'

	},
    button: {
		width: 260,
		height: 60,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#9009AB',
		color: '#090808',
		marginTop: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
    image:{ 
        marginTop:-200,
        width: 210,
        height: 210,
        
      },
})