import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import DireccionesList from '../components/DireccionesList';
import useAuth from '../hooks/useAuth';
import Loader from './../components/Loader';
export default function ApiDirecciones() {

    const [direcciones, setDirecciones] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    
    const {auth} = useAuth();
    let token = auth.token;
    let idUser = auth.idUser;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          try {
            setShowLoader(true);
            const response = await axios.get(URL_API+'v1/direcciones',config);
            let direccionesFilterer = [];
            response.data.map((item) => {
              if(item.user.idUser == idUser){
                direccionesFilterer.push(item)
              }
            })
            setDirecciones(direccionesFilterer);
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
        <DireccionesList direcciones={direcciones}/>
        </View>
      )
    }