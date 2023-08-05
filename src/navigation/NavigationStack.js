import { HeaderTitle, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginForm from '../screen/LoginForm';
import NavigationTab from './NavigationTab';
import Notificaciones from '../screen/Notificaciones';
import Solicitudes from '../screen/Solicitudes';
import CrearCuenta from '../screen/CrearCuenta';
import OlvidasteContrasena from '../screen/OlvidasteContrasena';
import LimpiezaCheck from '../screen/LimpiezaCheck'
<<<<<<< HEAD
import PublicacionesCard from '../components/PublicacionesCard';
import DetallePublicacion from '../components/DetallePublicacion';
import CrearPublicacion from '../screen/CrearPublicacion';
=======
import MyLocations from '../screen/MyLocations';
import AddLocation from '../screen/AddLocation';
>>>>>>> 8d649e9fe2e13c88169105d529c54f02c0f7c4cd


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
<<<<<<< HEAD

            <Stack.Screen
				name='PublicacionesCard'
				component={PublicacionesCard}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='DetallePublicacion'
				component={DetallePublicacion}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			<Stack.Screen
				name='CrearPublicacion'
				component={CrearPublicacion}
				//options={{ headerShown: false }} // Opcional: ocultar la barra de navegación en el TabNavigator
			/>
			
=======
			<Stack.Screen
				name='MyLocations'
				component={MyLocations}
				options={{ headerTitle: 'Mis lugares de limpieza' }}
			/>
			<Stack.Screen
				name='AddLocation'
				component={AddLocation}
				options={{ headerShown: false }}
			/>
>>>>>>> 8d649e9fe2e13c88169105d529c54f02c0f7c4cd
		</Stack.Navigator>
	);
}
