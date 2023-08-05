import { View, Text, SafeAreaView} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import PublicacionesLists from '../components/PublicacionesList'

export default function ApiPublicacion() {

const [publicaciones, setPublicaiones] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(URL_API +"v1/publicaciones");
            setCharacters(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };


    fetchData();
}, []);

  return (
    <SafeAreaView>
    <PublicacionesLists publicaciones={publicaciones}/>
    </SafeAreaView>
  )
}