import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity, } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ButtonLogin from '../components/ButtonLogin';
import DescripcionContainer from '../components/DescripcionContainer';




export default function Solicitud() {
    const descripcionLarga = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum lorem nec lorem auctor, ut venenatis risus blandit. Cras pulvinar ipsum mauris, in fringilla mauris viverra sit amet. Sed faucibus convallis libero eget congue. Donec sollicitudin efficitur velit, vitae dignissim tellus commodo non. Sed mattis scelerisque ipsum, vel tincidunt odio accumsan eu. Donec id tellus non mauris congue blandit ut sit amet erat. Curabitur faucibus consectetur mauris, sit amet malesuada lectus iaculis vitae. Vestibulum sit amet interdum ligula. Donec sed urna at est elementum congue. Nam posuere, risus vitae bibendum faucibus, nisl risus fringilla urna, non cursus ligula neque nec augue. Aliquam eget dolor nec odio consequat ultrices sed a dui. Cras tempor, lacus vel congue suscipit, ex elit tristique mi, in interdum lorem diam sed felis. Suspendisse id erat enim.";
    return (
		
        <View style={styles.container}>
			<Image
                source={require('../assets/departamento.jpg')}
                style={styles.image}
            />
        	<DescripcionContainer descripcion={descripcionLarga} />
			<ButtonLogin 	
				title='Postularme '
			/>
		</View>
      )
}
const styles = StyleSheet.create({
    container: {
		padding: 10,
		backgroundColor: '#F0F0F0',
		borderRadius: 8,
		marginVertical: 10,
		alignItems:'center'
	  },
	  descripcion: {
		fontSize: 16,
		color: '#333',
	  },
	  card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		elevation: 4,
		marginVertical: 4,
		marginHorizontal: 2,
		flexDirection: 'row',
		alignItems: 'right',
		padding: 75,
        
		
	  },
      button: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
	  cardImage: {
		width: 190,
		height: 190,
		
	  },
	  cardContent: {
		marginLeft: 16,
	  },
	  cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	  },
	  cardDescription: {
		fontSize: 14,
		color: '#888',
		marginTop: 4,
	  },
	  floatingButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		backgroundColor: '#8EA604',
		borderRadius: 50,
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
	  },
	  buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	  },
	  image:{ 
        marginTop:-20,
        width: '100%',
        height: 210,
        
      },
     
})