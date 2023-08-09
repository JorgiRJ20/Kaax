import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Palette from '../constants/Palette';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import FloatButton from '../components/FloatButton';

export default function MyLocations() {

    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate("AddLocation", {
            // dataLocation: {latitude: 20.6522979, longitude: -100.4092982}
            // infoLocation: {}
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
})