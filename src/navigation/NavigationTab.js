import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginForm from '../../src/screen/LoginForm';
import Notificaciones from '../screen/Notificaciones';
import Home from '../screen/Home';

export default function NavigationTab() {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator>
			<Tab.Screen
				name='Home'
				component={Home}
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
