import axios from 'axios';
import { URL_API } from '../utils/enviroments';

export async function getPostulaciones(idUser) {
  console.log('Valor de idUser:', idUser);
  try {
    
    const response = await axios.get(URL_API +`postulaciones/usuario/${idUser}`);
    console.log('Respuesta de la API:', response.data); // A
    const data = response.data.map(postulacion => ({
      
      titulo: postulacion[0],
      descripcion: postulacion[1],
      idUsuarioPostulante: postulacion[2],
      nombreUsuarioPostulante: postulacion[3],
      idUsuarioPublicacion: postulacion[4],
      nombreUsuarioPublicacion: postulacion[5],
      pago: postulacion[6],
      fechaPostulacion: postulacion[7],
      status: postulacion[8],
    }));
    console.log('Datos de la API:', data); // Agrega este console.log para verificar los datos obtenidos
    return data;
  } catch (error) {
    console.error('Error al obtener las postulaciones:', error);
    return [];
  }
};


