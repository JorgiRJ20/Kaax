import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import PublicacionesLimList from '../components/PublicacionesLim/PublicacionesLimList';
import useAuth from '../hooks/useAuth';
export default function ApiPublicacionLim() {
    const [publicacionesLim, setPublicacionesLim] = useState([]);
    const {auth} = useAuth();
    let token = auth.token;
    console.log(auth)
    
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