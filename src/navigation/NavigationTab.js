import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Notificaciones from '../screen/Notificaciones';
import Solicitudes from '../screen/Solicitudes'
import PublicacionesCard from '../components/PublicacionesCard';

export default function NavigationTab() {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator>
			<Tab.Screen
				name='PublicacionesCard'
				component={PublicacionesCard}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon color={color} size={30} /> // Cambia 'home' por el nombre del icono que desees utilizar
					),
					headerShown: false,
				}}
			></Tab.Screen>
			<Tab.Screen
				name='Notificaciones'
				component={Notificaciones}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon color={color} size={30} />
					),
					headerShown: false,
				}}
			></Tab.Screen>
		</Tab.Navigator>
	);
}
