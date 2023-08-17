import axios from 'axios';
import { URL_API } from '../utils/enviroments';
import useAuth from '../hooks/useAuth';

export async function getPostulaciones(idUser,config) {
  console.log('Valor de idUser:', idUser);
  console.log('Valor de token:', config);
  
  //console.log('Valor de idUser:', idUser);
  try {
    
    const response = await axios.get(URL_API +`postulaciones/usuario/${idUser}`,config);
    //console.log('Respuesta de la API:', response.data); 
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
      idPostulacion: postulacion[9],
      fechaTrabajo: postulacion[10],
      horaTrabajo: postulacion[11],
      imagenUrl: postulacion[12]
    }));
    //console.log('Datos de la API:', data); 
    return data;
  } catch (error) {
    //console.error('Error al obtener las postulaciones:', error);
    return [];
  }
};


