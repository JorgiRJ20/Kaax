import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import PublicacionesLimList from '../components/PublicacionesLim/PublicacionesLimList';

export default function ApiPublicacionLim() {
    const [publicacionesLim, setPublicacionesLim] = useState([]);
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWVnbzEyM0BnbWFpbC5jb20iLCJpYXQiOjE2OTE0NzQ5NjYsImV4cCI6MTY5MTU2MTM2Nn0.rpG6y_P0HlQP3lXn1zArot4jqOsAVtSxOoGY2hGxyrM";
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL_API+'v1/publicaciones',config);
                setPublicacionesLim(response.data);
            } catch (error) {
                console.error(error);
            }
        };
    
    
        fetchData();
    }, []);
    
      return (
        <View>
        <PublicacionesLimList publicacionesLim={publicacionesLim}/>
        </View>
      )
}