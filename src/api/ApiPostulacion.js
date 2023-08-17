import axios from 'axios';
import { URL_API } from '../utils/enviroments';


export async function postularse(idUser, idPublicacion, comment,fechaPostulacion,status,config) {
  try {
    
   const requestData = {
      user: { idUser }, // Utiliza el idUser del usuario logueado
      publicacion: { idPublicacion },
      descripcion: comment,
      fecha_postulacion: fechaPostulacion,
      status: status // 1 postulado / 2 aceptado / 3 rechazado
    };
    

    const response = await axios.post(URL_API + "postulaciones/v1/postulaciones", requestData,config)

    return response.data;
  } catch (error) {
    throw error;
  }
}




