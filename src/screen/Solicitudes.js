import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Card from '../components/kaaxCard'

export default function Home(props) {
	
	return (
		<View style={styles.container}>
      		<ScrollView contentContainerStyle={styles.cardContainer}>
        		<Card />
        	
        		{/* Agrega más tarjetas aquí */}
      </ScrollView>
    </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	  },
	  cardContainer: {
		marginTop: 16,
		paddingHorizontal: 4,
	  },
	
});
