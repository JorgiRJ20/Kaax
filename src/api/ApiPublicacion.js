import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import PublicacionesLists from '../components/PublicacionesList'
import useAuth from '../hooks/useAuth';

export default function ApiPublicacion() {

const [publicaciones, setPublicaciones] = useState([]);
const {auth} = useAuth();
let token = auth.token;
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(URL_API+'v1/publicaciones',config);
            setPublicaciones(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    fetchData();
}, []);

  return (
    <View>
    <PublicacionesLists publicaciones={publicaciones}/>
    </View>
  )
}