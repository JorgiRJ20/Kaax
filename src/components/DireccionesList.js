import { SafeAreaView,FlatList,StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import MyLocations from '../screen/MyLocations';
import Palette from '../constants/Palette'; 
import FloatButton from './FloatButton'
export default function DireccionesList(props) {

  const navigation = useNavigation();
    const {direcciones} = props;

    const handleNavigate = () => {
      navigation.navigate("AddLocation",{});
  }

    return (
      <SafeAreaView >

              <FlatList
                  data={direcciones}
                  numColumns={1}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(direcciones) => String(direcciones.idDireccion)}
                  renderItem={({ item }) => <MyLocations direcciones={item} />}
                  contentContainerStyle={styles.container}
              />
                <FloatButton
                handleNavigateTo={handleNavigate} 
                screenCalled={'DireccionesList'} 
                backgroundColor={Palette.colors.primary} 
                plusColor={Palette.colors.white}
            />
      </SafeAreaView>
  
    )
  }
  const styles = StyleSheet.create({
      container:{
          marginTop:1,
          marginVertical:10
      }
  })