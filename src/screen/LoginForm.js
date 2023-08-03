import {View, Text, TextInput, Button, StyleSheet, SafeAreaView,Image,StatusBar,
} from 'react-native';
import ButtonLogin from '../components/ButtonLogin';

export default function LoginForm(props) {
const { navigation } = props;
	const goToCrearCuenta = () => {
		navigation.navigate('CrearCuenta');
	};
	const goToOlvidaste = () => {
		navigation.navigate('OlvidasteContrasena');
	};
	
	return (
		<View style={styles.mainContainer}>
			<View style={styles.containerSvg}>
		<Image
			 source={require('../assets/kaax.png')}
			 style={{ width: 350, height: 350, top: 70, left:8}}
		 />
	   <Text style={styles.title}>BIENVENIDO</Text>  
					
					<TextInput
            placeholder='Nombre de usuario'
            style={styles.input}
            autoCapitalize='none'
      />

               <Text style={styles.error}>{}</Text>

					<TextInput
            placeholder='Contraseña'
            style={styles.input}

      />

				<ButtonLogin  title='Iniciar sesión'/>
		<Text style={styles.text3}>
					¿No tienes cuenta?{' '}
					<Text style={styles.boldText} onPress={goToCrearCuenta}>
						Crear Cuenta
					</Text>
				</Text>
		

				
					</View>
				</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: '#FFF',
		height: '100%',
	},
	containerSvg: {
		marginTop: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input:{
        height:60,
        margin:40,
        width:'80%',
        backgroundColor:'#ECECEC',
        borderRadius:30,
        padding:10,
        marginTop:-45,
        paddingStart:20
    },
	error: {
		color: 'red',
		fontSize: 14,
		marginTop: 1,
		textAlign: 'center',
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
		fontSize: 70,
		color: '#000000',
		fontWeight: 'bold',
	},
	text2: {
		fontSize: 15,
		color: '#848484',
		marginTop: 100,
		left:107,
		marginRight: 190,
	},
	text3: {
		fontSize: 15,
		color: '#848484',
		
	},
	boldText: {
		fontWeight: 'bold',
		color: '#99C24D'

	},
	title:{
        textAlign: 'center',
        fontSize:48,
        fontWeight:'bold',
        marginTop: 100,
        marginBottom: 60,
        marginTop:40,
        color:'#99C24D'
    },
});
