import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Notificaciones from '../screen/Notificaciones';
import Solicitudes from '../screen/Solicitudes'
import PublicacionesCard from '../components/PublicacionesCard';
import NavigationOptions from './NavigationOptions';
import ApiPublicacionLim from './../api/ApiPublicacionLim';
import ApiPublicacion from '../api/ApiPublicacion';
import SolicitudesTrabajo from '../screen/SolicitudesTrabajo';
import ApiDirecciones from '../api/ApiDirecciones';
import Palette from '../constants/Palette';
import useAuth from '../hooks/useAuth';
import { ROLE_SOLICITANTE } from '../utils/enviroments';


export default function NavigationTab() {
	const Tab = createBottomTabNavigator();

	// Llama al hook de autenticación
	const { auth } = useAuth(); 
	//console.log(auth.role)
	const userRole = auth ? auth.role : null;
	//console.log(auth.role)
	//console.log( ROLE_SOLICITANTE )
	// Determina qué componente de solicitudes mostrar en función del rol
	const SolicitudesComponent = userRole === ROLE_SOLICITANTE ? SolicitudesTrabajo : Solicitudes;
	const screenPublicaciones = userRole === ROLE_SOLICITANTE ? ApiPublicacion : ApiPublicacionLim;

	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				style: {
					...styles.bottomTabContainer
				}
			}}
			
		>
			<Tab.Screen
				name='Solicitudes'
				component={SolicitudesComponent}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{justifyContent: 'center', alignItems: 'center'}}>
							<Image
								source={require('../assets/images/iconSolicitudes.png')}
								resizeMode='contain'
								style={{
									...styles.iconTab,
									tintColor: focused ? Palette.colors.primary : Palette.colors.outFocus,
								}}
							/>
							<Text style={{...styles.textTab, color: focused ? Palette.colors.primary : Palette.colors.outFocus}}>Solicitudes</Text>
						</View>
					),
					headerShown: false,
				}}
			></Tab.Screen>
			<Tab.Screen
				name='Publicaciones'
				component={screenPublicaciones}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{justifyContent: 'center', alignItems: 'center'}}>
							
								<Image
									source={require('../assets/images/iconPublicaciones.png')}
									resizeMode='contain'
									style={{
										...styles.iconTab,
										width: 105,
										height: 105,
										
									}}
								/>
							
							
							<Text style={{...styles.textTab, top: -16, color: focused ? Palette.colors.primary : Palette.colors.outFocus}}>Publicaciones</Text>
						</View>
					),
					headerShown: false,
				}}
			></Tab.Screen>
			<Tab.Screen
				name='Opciones'
				component={NavigationOptions}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{justifyContent: 'center', alignItems: 'center'}}>
							<Image
								source={require('../assets/images/iconOpciones.png')}
								resizeMode='contain'
								style={{
									...styles.iconTab,
									tintColor: focused ? Palette.colors.primary : Palette.colors.outFocus,
								}}
							/>
							<Text style={{...styles.textTab, color: focused ? Palette.colors.primary : Palette.colors.outFocus}}>Opciones</Text>
						</View>
					),
					headerShown: false,
				}}
			></Tab.Screen>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	bottomTabContainer: {
		position: 'absolute',
		bottom: 15,
		left: 10,
		right: 10,
		elevation: 0,
		backgroundColor: '#f8f8f8',
		borderRadius: 15,
		height: 70,
		shadowColor: Palette.colors.black,
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	},
	iconTab: {
		width: 25,
		height: 25,
	},
	textTab: {
		fontSize: 14
	},
	circleContainer: {
		backgroundColor: Palette.colors.primary, 
		width: 60, 
		height: 60, 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderRadius: 35,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: Palette.colors.primary,
		shadowOpacity: 0.4,
		shadowRadius: 2,
		elevation: 8,
		top: -15
	},
})
