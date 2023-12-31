import { View, Text, SafeAreaView,FlatList,StyleSheet,ActivityIndicator} from 'react-native'
import React from 'react'
import PublicacionesCard from './PublicacionesCard';
import { useNavigation } from '@react-navigation/native';
import Palette from '../constants/Palette'; 
import FloatButton from './FloatButton'
export default function PublicacionesList(props) {
    
    const {publicaciones} = props;

    const navigation = useNavigation();

    const handleNavigate = () => {
      navigation.navigate("CrearPublicacion");
  }

  return (
    <View >

            

			<FlatList
				data={publicaciones}
				numColumns={1}
				showsVerticalScrollIndicator={false}
				keyExtractor={(publicaciones) => String(publicaciones.idPublicacion)}
				renderItem={({ item }) => <PublicacionesCard publicaciones={item} />}
				contentContainerStyle={styles.container}
        ListFooterComponent={<View style={{marginBottom: 200}}></View>}
        />
    </View>

  )
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:0,
    }
})