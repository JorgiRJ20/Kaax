import axios from 'axios';
import { URL_API } from '../utils/enviroments';


export async function aceptarPostulacion(idPostulacion) {
    console.log(idPostulacion)
  try {
    const response = await axios.post(`${URL_API}/postulaciones/${idPostulacion}/aceptar`);
    return response.data;
  } catch (error) {
    console.error('Error al aceptar la postulación:', error);
    throw error; 
  }
  
}

export async function rechazarPostulacion(idPostulacion) {
  try {
    const response = await axios.post(`${URL_API}/postulaciones/${idPostulacion}/rechazar`);
    return response.data;
  } catch (error) {
    console.error('Error al rechazar la postulación:', error);
    throw error; 
  }
}


