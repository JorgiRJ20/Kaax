import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginForm from '../screen/LoginForm';
import NavigationTab from './NavigationTab';
import Notificaciones from '../screen/Notificaciones';
import Solicitudes from '../screen/Solicitudes';
import CrearCuenta from '../screen/CrearCuenta';
import OlvidasteContrasena from '../screen/OlvidasteContrasena';
import LimpiezaCheck from '../screen/LimpiezaCheck'


export default function NavigationStack() {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName='Login'>
			<Stack.Screen
				name='Login'
				component={LoginForm}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Tab'
				component={NavigationTab}
				options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='Notificaciones'
				component={Notificaciones}
				options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='Solicitudes'
				component={Solicitudes}
				options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='CrearCuenta'
				component={CrearCuenta}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='LimpiezaCheck'
				component={LimpiezaCheck}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='OlvidasteContrasena'
				component={OlvidasteContrasena}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
		</Stack.Navigator>
	);
}
