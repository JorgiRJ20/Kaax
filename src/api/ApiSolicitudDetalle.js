import axios from 'axios';
import { URL_API } from '../utils/enviroments';

export async function getSolicitudDetalle (idPostulacion) {
  console.log('Valor de postulacion:', idPostulacion);
  try {
    
    const response = await axios.get(URL_API +`postulaciones/postulacion/${idPostulacion}`);
    console.log('Respuesta de la API:', response.data); // A
    const data = response.data.map(detalle => ({
      
      idPostulacion: detalle[0],
      tituloPublicacion: detalle[1],
      nombreUsuario: detalle[2],
      userImage: detalle[3],
      fechaPostulacion: detalle[4],
      comment: detalle[5],
      
    

    }));
    console.log('Datos de la API:', data); // Agrega este console.log para verificar los datos obtenidos
    return data;
  } catch (error) {
    console.error('Error al obtener las postulaciones:', error);
    return [];
  }
};