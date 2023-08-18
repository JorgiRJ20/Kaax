import { SafeAreaView } from 'react-native-safe-area-context'
import Palette from '../constants/Palette';
import ItemOption from '../components/ItemOption';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import useAuth from '../hooks/useAuth';
import { ROLE_LIMPIADOR, ROLE_SOLICITANTE } from '../utils/enviroments';
import { useNavigation } from '@react-navigation/native';

export default function Options() {
    const navigation = useNavigation();
    const auth = useAuth();
    const { role, idUser, name, phone, email, userImage } = auth.auth;
    const handlePress = () => {
        navigation.navigate('MiPerfil', {
            userId: idUser,
            userName: name,
            userPhone: phone,
            userEmail: email,
            userPhoto: userImage
        });
	};

    
    const iconLocations = <Entypo name="location" size={24} color={Palette.colors.primary} />;
    const iconLogout =<AntDesign name="logout" size={24} color={Palette.colors.primary} />;

    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity onPress={handlePress}>
            <View style={style.ContentPerfil}>
            <Image style={style.fotoPerfil} source={{ uri: auth.auth.userImage }} />
                <View style={style.ContentDatosPerfil} >
            <Text style={style.TitlePerfil}>{auth.auth.name}</Text>

            <Text style={style.TitleCorreo}>{auth.auth.email}</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View style={style.cardContainer}>
                {role === ROLE_SOLICITANTE && (
                    <ItemOption iconComponent={iconLocations} name={'Mis lugares de limpieza'} navigateTo={"ApiDirecciones"}/>
                )}
                <ItemOption iconComponent={iconLogout} name={'Cerrar sesión'} navigateTo={"Login"}/>
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
    },
    ContentPerfil: {
        flexDirection: 'row', // Esto hará que los elementos se coloquen en fila
        alignItems: 'center', 
        paddingHorizontal: 10, 
      },
      fotoPerfil: {
        width: 100,
        height: 100,
        borderRadius: 50, 
        borderWidth:5,
        borderColor:'#05668D'
      },
      ContentDatosPerfil: {
        marginLeft: 15, // Añade un poco de espacio entre la imagen y los textos
      },
      TitlePerfil:{
        textTransform: 'uppercase', 
        color: '#05668D',
        fontSize: 23,
        fontWeight: 'bold',
      },
      TitleCorreo:{
        color: '#05668D',
        fontSize: 17,
        fontWeight: '400',
      }
})