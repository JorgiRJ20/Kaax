import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Palette from '../constants/Palette';
import ItemOption from '../components/ItemOption';
import { Entypo } from '@expo/vector-icons';

export default function Options() {


    const iconLocations = <Entypo name="location" size={24} color={Palette.colors.primary} />;

    return (
        <SafeAreaView style={style.container}>
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
    }
})