import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Palette from '../constants/Palette';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import FloatButton from '../components/FloatButton';

export default function MyLocations() {

    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate("AddLocation", {

        });
    }

    return (
        <SafeAreaView style={style.container}>
                
            <FloatButton
                handleNavigateTo={handleNavigate} 
                screenCalled={'MyLocations'} 
                backgroundColor={Palette.colors.primary} 
                plusColor={Palette.colors.white}
            />
            
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnStyle: {
        marginTop: 15,
        marginBottom: 8,
        marginHorizontal: 10,
        padding: 2,
        borderRadius: 10,
        borderColor: Palette.colors.primary,
        borderWidth: 1,
        display: "flex",
    }
})