import axios from 'axios';
import { URL_API } from '../utils/enviroments';


export async function getSolicitudes(idUser,config) {
  console.log('Valor de idUser:', idUser);
  console.log('Valor de token:', config);
  
  try {  
    const response = await axios.get(URL_API +`postulaciones/publicacion/${idUser}`, config);
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
      fechaTrabajo: postulacion[8],
      horaTrabajo: postulacion[9],
      userImage: postulacion[10],
      imagenUrl: postulacion[11]
    

    }));
    console.log(response.data);
    console.log('Datos de la API:', data); // Agrega este console.log para verificar los datos obtenidos
    return data;
  } catch (error) {
    console.error('Error al obtener las postulaciones:', error);
    return [];
  }
};