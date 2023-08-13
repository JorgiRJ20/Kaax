import { SafeAreaView } from 'react-native-safe-area-context'
import Palette from '../constants/Palette';
import ItemOption from '../components/ItemOption';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import useAuth from '../hooks/useAuth';
import { ROLE_LIMPIADOR, ROLE_SOLICITANTE } from '../utils/enviroments';

export default function Options() {

    const auth = useAuth();
    const { role } = auth.auth;
    console.log(role);

    
    const iconLocations = <Entypo name="location" size={24} color={Palette.colors.primary} />;
    const iconLogout =<AntDesign name="logout" size={24} color={Palette.colors.primary} />;

    return (
        <SafeAreaView style={style.container}>
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
    }
})