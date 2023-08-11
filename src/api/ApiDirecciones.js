import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import DireccionesList from '../components/DireccionesList';
export default function ApiDirecciones() {
    const [direcciones, setDirecciones] = useState([]);
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWVnbzEyM0BnbWFpbC5jb20iLCJpYXQiOjE2OTE2NDAxNzcsImV4cCI6MTY5MTcyNjU3N30.tHzy--e_TUDz0lu7bEGNP0vyGdFoLx8W0aFcp1WruKw";
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    useEffect(() => {
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
    }, []);
    
      return (
        <View>
        <DireccionesList direcciones={direcciones}/>
        </View>
      )
    }