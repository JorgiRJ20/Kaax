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
import Palette from '../constants/Palette';


export default function NavigationTab() {
	const Tab = createBottomTabNavigator();

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
				component={Solicitudes}
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
				component={ApiPublicacionLim}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{justifyContent: 'center', alignItems: 'center'}}>
							<View style={styles.circleContainer}>
								<Image
									source={require('../assets/images/iconPublicaciones.png')}
									resizeMode='contain'
									style={{
										...styles.iconTab,
										width: 35,
										height: 35,
										tintColor: Palette.colors.white ,
									}}
								/>
							</View>
							
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
