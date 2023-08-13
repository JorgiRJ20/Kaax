import React from 'react';
import { ActivityIndicator, View, Dimensions, Text, StyleSheet } from 'react-native';
import Palette from '../constants/Palette';


const Loader = (props) => {
const { width, height } = Dimensions.get('screen');
return (
    <View
    style={{
        display: props.show == true ? 'flex' : 'none',
        position: props.show == true ? 'absolute' : 'relative',
        width: width * 10,
        height: height * 10,
        zIndex: 1001,
        backgroundColor: '#fff',
        opacity: 0.8,
    }}
    >
    <View
        style={{
            display: props.show == true ? 'flex' : 'none',
            position: props.show == true ? 'absolute' : 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height * 0.8,
            zIndex: 1001,
            top: 0,
        }}
    >
        <ActivityIndicator size='large' color={Palette.colors.primary} />
        <Text style={{ marginTop: 10 }}>Cargando...</Text>
    </View>
    </View>
);
};

export default Loader;
const styles = StyleSheet.create({
})