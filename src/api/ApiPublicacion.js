import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import PublicacionesLists from '../components/PublicacionesList'
import useAuth from '../hooks/useAuth';
import FloatButton from '../components/FloatButton';
import { useNavigation } from '@react-navigation/native';
import Palette from '../constants/Palette';

export default function ApiPublicacion() {

const [publicaciones, setPublicaciones] = useState([]);
const {auth} = useAuth();
let token = auth.token;
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

  const navigation = useNavigation();


  const handleNavigate = () => {
    navigation.navigate("CrearPublicacion");
  }

useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(URL_API+'v1/publicaciones',config);
          setPublicaciones(response.data);
      } catch (error) {
          console.error(error);
      }
  };
  fetchData();
  }, [])
);

  return (
    <View style={{flex: 1}}>
      <PublicacionesLists publicaciones={publicaciones}/>
      <FloatButton
                handleNavigateTo={handleNavigate} 
                screenCalled={'PublicacionesList'} 
                backgroundColor={Palette.colors.primary} 
                plusColor={Palette.colors.white}
            />
    </View>
  )
}