import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Palette from '../constants/Palette';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function ItemOption(props) {

    const { iconComponent, name, navigateTo, data } = props;
    const navigation = useNavigation();

    const handleNavigateTo = () => {
        navigation.navigate(navigateTo, {
            data: data
        });
    }

    return (
        <TouchableOpacity 
            style={style.container}
            onPress={() => handleNavigateTo()}
        >
            <View style={style.containerIcon}>
                <View style={style.circleIcon}>
                    {iconComponent}
                </View>
            </View>
            <View style={style.containerNameOp}>
                <Text style={style.textName}>{name}</Text>
            </View>
            <View style={style.containerRow}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>
            
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8'
    },
    containerIcon: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerNameOp: {
        flex: 0.8,
        justifyContent: 'center'

    },
    containerRow: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    circleIcon: {
        backgroundColor: '#fcfeff', 
        width: 40, 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 35,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: Palette.colors.primary,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 8,
    },
    textName: {
        fontSize: 14,
        fontWeight: '500'
    }
})