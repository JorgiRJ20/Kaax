import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Palette from "../constants/Palette";

/**
 * 
 * @param {Function Callback} handleNavigateTo - Función para navegar a otra screen 
 * @param {String} screenCalled - Pantalla donde se llama al botón
 * @returns 
 */
export default function FloatButton ( { handleNavigateTo, screenCalled, backgroundColor, plusColor } ) {
    
    return (
        <TouchableOpacity
            style={{...styles.button, backgroundColor: backgroundColor, bottom: screenCalled === "PublicacionesList" ? 90 : 10}}
            onPress={() => handleNavigateTo()}
        >
            <AntDesign name="plus" size={24} color={plusColor} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        right: 10,
        height: 70,
        borderRadius: 100,
    }
})