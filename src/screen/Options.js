import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Palette from '../constants/Palette';
import ItemOption from '../components/ItemOption';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Options() {

    const navigation = useNavigation();
	const handlePress = () => {
		navigation.navigate('MiPerfil');
	};

    const iconLocations = <Entypo name="location" size={24} color={Palette.colors.primary} />;
  

    return (
        <SafeAreaView style={style.container}>
               <TouchableOpacity onPress={handlePress}>
            <View style={style.contentPerfil}>
         
            <Image style={style.fotoPerfil}
			 source={require('../assets/persona.jpg')}
		     />	
            
        
             <View style={style.contentDatos}>
                <Text style={style.usuario} >Daniel Torres</Text>
                <Text style={style.correo}>Danny@gmail.com</Text>
             </View>
            </View>
            </TouchableOpacity>

            <View style={style.cardContainer}>
                <ItemOption iconComponent={iconLocations} name={'Mis lugares de limpieza'} navigateTo={"MyLocations"}/>
            </View>
           
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    contentPerfil:{
        flexDirection:'row',
        alignItems:'center'
    },
    cardContainer: {
        margin: 10, 
        backgroundColor: Palette.colors.white, 
        borderRadius: 20, 
        padding: 20,
        elevation: 5, 
        shadowColor: Palette.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, 
        shadowRadius: 5, 
    },
    contentDatos: {
    
    },
    fotoPerfil:{
		width: 110, height: 110, borderColor: '#FFF', borderWidth:7, borderRadius:180, marginEnd:15, marginStart:15
	},
    usuario:{
	color: '#05668D', fontSize: 25, fontWeight:'900'
	},
    correo:{
    color: '#05668D', fontSize: 18, fontWeight:'700'
    },
})