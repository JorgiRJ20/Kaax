import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ButtonLogin({ title, handleSubmit, style }) {
	const navigation = useNavigation();
	const buttonStyle = [styles.button, style];
	//const handlePress = () => {
		// Navegar a una pantalla específica
	//	navigation.navigate('Tab');
	//};

	return (
		<TouchableOpacity style={buttonStyle} onPress={handleSubmit}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 260,
		height: 60,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#006E90',
		color: '#090808',
		marginTop: 15,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
});
