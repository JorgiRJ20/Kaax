import {View, Text, TextInput, Button, StyleSheet, SafeAreaView,Image,StatusBar, TouchableOpacity
} from 'react-native';
import { Modal } from 'react-native-paper';
import React, { useContext, useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import ButtonLogin from '../components/ButtonLogin';
import { Formik } from "formik";
import * as Yup from "yup";
import { ApiUserAuthentication } from '../api/ApiUserAuthentication';
import useAuth from '../hooks/useAuth';
import { KeyboardAvoidingView } from 'react-native';

export default function LoginForm(props) {
	const { navigation } = props; 

	const { auth, login } = useAuth();

	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");
	const [hidePass, setHidePass] = useState(true);
  	//const [statusLogin, setStatusLogin] = React.useState(false);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	

	const initialValues = {
		email: "",
		password: "",
	};

	let userData = {
		token: "",
		idUser: 0,
		email: "",
		name: "",
		phone: "",
		role: "",
		status: "",
		userImage: "",
		username: ""
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string().required(true).email("Ingresa un correo válido"),
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
	});

	const goToHome = () => {
		navigation.navigate("Tab");
	};

	const goToCrearCuenta = () => {
		navigation.navigate('CrearCuenta');
	};

	const goToOlvidaste = () => {
		navigation.navigate('OlvidasteContrasena');
	};

	const authUser = async (values) => {
		try {
			const response = await ApiUserAuthentication(values);
			if (response.response === null) {
				console.log(response);
				//setStatusLogin(true);
				setMessage("La contraseña o el email es incorrecto");
				showModal();
			} else {
				userData = {
					token: response.data.response.token,
					idUser: response.data.response.user.idUser,
					email: response.data.response.user.email,
					name: response.data.response.user.name,
					phone: response.data.response.user.phone,
					role: response.data.response.user.role.authority,
					status: response.data.response.user.status,
					userImage: response.data.response.user.userImage,
					username: response.data.response.user.username
				}
				login(userData)
				console.log(auth)
				//setStatusLogin(true);
				setMessage("");
				goToHome()
			}
		} catch (error) {
			//setStatusLogin(true);
			setMessage("Error al iniciar sesión");
			showModal();
		  	console.log("error en saveUser", error);
		}
	};
	
	return (
		<KeyboardAvoidingView behavior="position" style={styles.mainContainer}>
		<View style={{backgroundColor:"#FFF"}}>
			<View style={styles.containerSvg}>
				<Image
					source={require('../assets/kaax.png')}
					style={{ width: 350, height: 350, top: 60}}
				/>
	   			<Text style={styles.title}>BIENVENIDO</Text>  
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm }) => {
						// funcion para limpiar los campos
						try {
						//setVisible(true);
						//setStatusLogin(false);
							console.log("onSubmit", values);
							authUser(values);
							resetForm();
						} catch (error) {
						// resetForm();
						}
					}}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
						isValid,
					}) => (
						<View style={styles.formContainer}>
							<View style={styles.inputArea}>
								<TextInput
									placeholder='Email de usuario'
									style={styles.input}
									autoCapitalize='none'
									onChangeText={handleChange("email")}
									value={values.email}
									onBlur={handleBlur("email")}
									textAlignVertical="center"  
								/>
							</View>
							<Text style={styles.error}>{errors.email}</Text>
							<View style={styles.inputArea}>
								<TextInput
									placeholder='Contraseña'
									style={styles.input}
									autoCapitalize='none'
									// secureTextEntry={true}
									onChangeText={handleChange("password")}
									value={values.password}
									onBlur={handleBlur("password")}
									textAlignVertical="center"
									secureTextEntry={hidePass}  
								/>
								<TouchableOpacity onPress={ () => setHidePass(!hidePass)}>
									{ hidePass ?
											<Ionicons name='eye' color="#000" size={25}/>
										:
											<Ionicons name='eye-off' color="#000" size={25}/>
									}
								</TouchableOpacity>
							</View>
							<Text style={styles.error}>{errors.password}</Text>
							<TouchableOpacity
								style={styles.buttonDesign}
								// style={styles.btnTouchable}
								onPress={handleSubmit}
								disabled={!isValid}
							>
								<Text style={styles.buttonText}>Iniciar sesión</Text>
							</TouchableOpacity>
							<Text style={styles.text3}>
								¿No tienes cuenta?{' '}
								<Text style={styles.boldText} onPress={goToCrearCuenta}>
									Crear Cuenta
								</Text>
							</Text>
						</View>
					)}	
				</Formik>
				<Modal visible={visible} contentContainerStyle={styles.modal}>
					<View style={styles.modalResponse}>
						<Text style={styles.textProgress}>{message}</Text>
						<TouchableOpacity
						style={styles.aceptarbtn}
						onPress={() => hideModal()}
						>
							<Text style={styles.textaceptar}>Aceptar</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>	
		</View>
		</KeyboardAvoidingView>
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
	text3: {
		fontSize: 15,
		color: '#848484',
		marginTop: 20,
	},
	boldText: {
		fontWeight: 'bold',
		color: '#99C24D',
	},
	title:{
        textAlign: 'center',
        fontSize:48,
        fontWeight:'bold',
        marginTop: 100,
        marginBottom: 20,
        marginTop:40,
        color:'#99C24D'
    },
	buttonDesign: {
		width: 240,
		height: 60,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#006E90',
		color: '#090808',
		marginTop: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
	formContainer: {
		alignItems:"center",
		justifyContent:"center",
	},
	inputArea: {
		flexDirection: "row",
		alignItems: "center",
		width: 300,
		backgroundColor: "#ECECEC",
		borderRadius: 30,
		margin: 10,
		height: 60,
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
	input:{
		width: "85%",
		height: 60,	
		fontSize: 15,
		padding: 15,
    },
	error: {
		color: 'red',
		fontSize: 14,
		margin: 1,
		textAlign: 'center',
		fontWeight: "bold",
	},
	textProgress: {
		marginTop: 5,
		fontSize: 20,
		fontWeight: "bold",
		color: "#05668D",
		textAlign: "center",
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
});
