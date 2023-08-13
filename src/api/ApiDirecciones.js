import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import DireccionesList from '../components/DireccionesList';
import useAuth from '../hooks/useAuth';
export default function ApiDirecciones() {
    const [direcciones, setDirecciones] = useState([]);
    const {auth} = useAuth();
    let token = auth.token;
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    useFocusEffect(
      useCallback(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(URL_API+'v1/direcciones',config);
            setDirecciones(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
      };
      fetchData();
      }, [])
    );
      return (
        <View style={{flex: 1}}>
        <DireccionesList direcciones={direcciones}/>
        </View>
      )
    }