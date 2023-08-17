/*<=======================================================
 - File Name: ShowImages.js+
 - Description: Pantalla para visualizar imágenes
 <----------------------------------------------->

 - Item Name: Kaax - ShowImages
 - Author: Carlos Alessandro Guevara Silva 
 <----------------------------------------------->

 - Params:
    * props: Datos generales del usuario y screen
    * arrayImages: Array de las imágenes que mostraremos
    * indexShow: Index donde se renderizara el carousel
    * howShow: Si renderizara el carousel o la imagen
        - onlyImage: Mostrara solo la imagen de la uri que se pase
        - carousel: Mostrara el carousel con el array de imagenes que se pase
    * uriUrl; url de la imagen a mostrar
 
=======================================================>*/
import React, {useEffect, useState, useRef} from 'react';
import { 
    View, 
    Text,
    BackHandler,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { 
    Gesture, 
    GestureDetector, 
    GestureHandlerRootView,
    PanGestureHandler
} from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Palette from '../constants/Palette';
export const SLIDER_WIDTH = Dimensions.get("window").width+70;
export const SLIDER_HEIGHT = Dimensions.get("window").height+100;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.9);

const WIDTH_IMAGE = Dimensions.get("window").width;
const HEIGHT_IMAGE = Dimensions.get("window").width;
const HEIGHT_SCREEN = Dimensions.get("window").height;

const ShowImages = (props) => {
    // Variables generales
    const navigation = useNavigation();
    var howShow = props.route.params.howShow;
    var uriUrlImg;
    if(howShow === "onlyImage") {
        console.log("ebter 1");
        uriUrlImg = props.route.params.uriUrl+"";
    }else if(howShow === "carousel") {
        var recibeArrayImg;
        try {
            recibeArrayImg = props.route.params.arrayImages;
            
        } catch (error) {
            recibeArrayImg = [];
        }
    }else {
        howShow = "onlyImage";
        uriUrlImg = "prueba.com";
    }

    // Variables de componentes
    const arrayImages1 = [];
    const [carouselImages, setCarouselImages] = useState(recibeArrayImg);

    var indexNow = 0;
    try {
        indexNow = props.route.params.indexShow === undefined 
                    ? 0 
                    : props.route.params.indexShow;
    } catch (error) {
        indexNow = 0;
    }
    const [index, setIndex] = useState(indexNow);
    
    console.log(props.route.params);
    console.log(carouselImages);
    console.log(indexNow);

    //Variables zoom animación
    
    const centerImage = {
        x: WIDTH_IMAGE / 2,
        y: HEIGHT_IMAGE / 2
    };

    const scaleImage = useSharedValue(1);
    const focusX = useSharedValue(0);
    const focusY = useSharedValue(0);

    const pinchScreen = Gesture.Pinch().onStart((e) => {
        focusX.value = e.focalX;
        focusY.value = e.focalY;
    })
    .onUpdate((e) => {
        console.log(e);
        scaleImage.value = e.scale;
    }).onEnd(() => {
        //? Regresa a la posición inicial después terminar
        //? de hacer el pinchazo en pantalla
        
        //scaleImage.value = withTiming(1, {duration: 500});
    });

    const translateX = useSharedValue(0); // Referencia a posición en X
    const translateY = useSharedValue(0); // Referencia a posición en Y

    const context = useSharedValue({ x: 0, y: 0 }); // Contexto posición X y Y

    // Función para detectar el gesto de doble tap en la pantalla
    const doublePress = Gesture.Tap().numberOfTaps(2).onStart((e) => {
        // Si la escala esta en 1, significa que no tiene zoom
        // y lo dejaremos hacer el zoom
        if(scaleImage.value === 1) {
            focusX.value = e.absoluteX;
            focusY.value = e.absoluteY;
            scaleImage.value = withTiming(2, {duration: 500});
        }else {
            // Cuando es diferente de 1 significa que ya tiene zoom
            // y regresaremos el zoom a lo normal y también 
            // regresara a la posición inicial la imagen
            translateX.value = withTiming(0, { duration: 500 });
            translateY.value = withTiming(0, { duration: 500 });
            scaleImage.value = withTiming(1, {duration: 500});
        }
        
    });

    const panScreen = Gesture.Pan().onStart(() => {
        context.value = { x: translateX.value, y: translateY.value }
    })
    .onUpdate((e) => {
        // Si la escala es diferente a 1 significa que ya tiene zoom
        // y lo dejaremos mover la imagen
        if(scaleImage.value != 1) {
            translateX.value = e.translationX + context.value.x;
            translateY.value = e.translationY + context.value.y;
        }
        
        
    });


    // Función que permite modificar la posición de "X" y "Y"
    // de la imagen
    const panStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        }
    });

    

    const styleAnimated = useAnimatedStyle(() => ({
        transform: [
            { translateX: focusX.value },
            { translateY: focusY.value },
            { translateX: -centerImage.x },
            { translateY: -centerImage.y },
            { scale: scaleImage.value },
            { translateX: -focusX.value },
            { translateY: -focusY.value },
            { translateX: centerImage.x },
            { translateY: centerImage.y} ,
        ],
    }));

    




    // Componentes
    const cardImageCarousel = ({item, index}) => [
        <View 
            style={{width: ITEM_WIDTH, alignContent: 'center'}}
            key={index}
        >
                                        
            <Image 
                style={{
                    height: 300,
                    width: ITEM_WIDTH,
                    resizeMode: 'cover',
                }}
                source={{
                    uri: item.imgUrl
                }}
            />
                    
            <View>
                <Text style={styles.titleCarouselImg}>{item.title}</Text>
            </View>
        </View>
    ];

    

    // Funciones de acciones


    // Funciones use Effect
    useEffect(() => {
        console.log("FIRTS RENDER");

        const backActionE = () => {
            //navigation.goBack();
            console.log("BACK");
        }

        const backHandlerE = BackHandler.addEventListener(
            "hardwareBackPress",
            backActionE
        )

        //setCarouselImages(props.route.params.arrayImages);

        return () => backHandlerE.remove();

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerInfo}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="close" size={18} color="black" />
                </TouchableOpacity>
            </View>

                <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {howShow === "carousel" && (
                        <View style={{flex: 0.5}}>
                            
                        </View>
                    )}

                    {howShow === "onlyImage" && (

                        <GestureDetector gesture={doublePress}>
                            <GestureDetector gesture={panScreen}>
                            <Animated.View style={[panStyle]}>
                                <Animated.Image 
                                    style={[styles.imageShow, styleAnimated]}
                                    source={{
                                        uri: uriUrlImg+""
                                    }}
                                />
                                </Animated.View>
                            </GestureDetector>
                        </GestureDetector>
                    )}

                </Animated.View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.colors.black,
    },
    headerInfo: {
        zIndex: 2,
        marginTop: 50,
        flexDirection: 'row',
        position: 'absolute',
        

    },
    backButton: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        right: 0,
        left: 0,
        marginLeft: 15,
        borderRadius: 60
    },
    titleCarouselImg: {
        color: Palette.colors.white, 
        alignSelf: 'center', 
        fontSize: 18, 
        fontWeight: '500', 
        fontStyle: 'italic', 
        padding: 10
    },
    imageShow: {
        height: HEIGHT_IMAGE,
        width: WIDTH_IMAGE,
        resizeMode: 'cover',
    }
})
export default ShowImages;