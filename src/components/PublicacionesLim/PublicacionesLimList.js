import { View, Text, SafeAreaView,FlatList,StyleSheet,ActivityIndicator} from 'react-native'
import React from 'react'
import PublicacionesLimCard from './PublicacionesLimCard';

export default function PublicacionesLimList(props) {
    const {publicacionesLim} = props;

    return (
      <View >
              <FlatList
                  data={publicacionesLim}
                  numColumns={1}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(publicacionesLim) => String(publicacionesLim.idPublicacion)}
                  renderItem={({ item }) => <PublicacionesLimCard publicacionesLim={item} />}
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