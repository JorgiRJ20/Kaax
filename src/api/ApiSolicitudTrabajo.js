import axios from 'axios';
import { URL_API } from '../utils/enviroments';

export async function getSolicitudes(idUser) {
  console.log('Valor de idUser:', idUser);
  try {
    
    const response = await axios.get(URL_API +`postulaciones/publicacion/${idUser}`);
    console.log('Respuesta de la API:', response.data); // A
    const data = response.data.map(postulacion => ({
      
      idPublicacion: postulacion[0],
      //descripcion: postulacion[1],
      titulo: postulacion[1],
      nombreUsuarioPostulante: postulacion[2],
      comment: postulacion[3],
      status: postulacion[5],
      fechaPostulacion: postulacion[6],
      idPostulacion: postulacion[7],
    

    }));
    console.log('Datos de la API:', data); // Agrega este console.log para verificar los datos obtenidos
    return data;
  } catch (error) {
    console.error('Error al obtener las postulaciones:', error);
    return [];
  }
};