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
import Loader from './../components/Loader';


export default function ApiPublicacion() {

const [publicaciones, setPublicaciones] = useState([]);
const [showLoader, setShowLoader] = useState(false);
const {auth} = useAuth();
let token = auth.token;
let idUser = auth.idUser;
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
          setShowLoader(true);
          const response = await axios.get(URL_API+'v1/publicaciones',config);
          let publicacionesFilterer = [];
          response.data.map((item) => {
            if(item.status == 1 && item.user.idUser == idUser){
              publicacionesFilterer.push(item)
            }
          })
          setPublicaciones(publicacionesFilterer);
          setShowLoader(false);
      } catch (error) {
          console.error(error);
          setShowLoader(false);
      }
  };
  fetchData();
  }, [])
);

  return (
    <View style={{flex: 1}}>
       <Loader show={showLoader}/>
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