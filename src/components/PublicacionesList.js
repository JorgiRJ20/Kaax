import { View, Text, SafeAreaView,FlatList,StyleSheet,ActivityIndicator} from 'react-native'
import React from 'react'
import PublicacionesCard from './PublicacionesCard';

export default function PublicacionesList(props) {
    
    const {publicaciones} = props;

  return (
    <SafeAreaView>
			<FlatList
				data={publicaciones}
				numColumns={2}
				showsVerticalScrollIndicator={false}
					keyExtractor={(publicaciones) => String(publicaciones.idPublicacion)}
				renderItem={({ item }) => <Publicacionescard publicaciones={item} />}
				contentContainerStyle={styles.container}
            />
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:15,
    }
})