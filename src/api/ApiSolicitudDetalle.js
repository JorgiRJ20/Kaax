import axios from 'axios';
import { URL_API } from '../utils/enviroments';

//API Para ver el detalle de las solicitudes que me han llegado y aceptar o rechazar esa solicitud

export async function getSolicitudDetalle(idPostulacion,config) {
  console.log('Valor de postulacion:', config);
  try {
    const response = await axios.get(URL_API + `postulaciones/postulacion/${idPostulacion}`,config);
    console.log('Respuesta de la API:', response.data);
    const data = response.data.map(detalle => ({
      idPostulacion: detalle[0],
      tituloPublicacion: detalle[1],
      nombreUsuario: detalle[2],
      idLimpiador:detalle[3],
      userImage: detalle[4],
      email: detalle[5],
      phone: detalle[6],
      fechaPostulacion: detalle[7],
      comment: detalle[8],
    }));
    //console.log('Datos de la API:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener las postulaciones:', error);
    return [];
  }
}

export async function aceptarPostulacion(idPostulacion,config) {
  //console.log('idPos',idPostulacion)
  //console.log('conf',config)

  try {
    const response = await axios.post(URL_API + `postulaciones/${idPostulacion}/aceptar`,{},config);
    //console.log('acp:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al aceptar la postulación:', error);
    throw error;
  }
}

export async function rechazarPostulacion(idPostulacion,config) {
  try {
    const response = await axios.post(URL_API + `postulaciones/${idPostulacion}/rechazar`,{},config);
    //console.log(URL_API + `postulaciones/${idPostulacion}/rechazar`);
    return response.data;
  } catch (error) {
    console.error('Error al rechazar la postulación:', error);
    throw error;
  }
}

//Funcion para mostrar informacion a rol:Limpiador cuando la respuesta fue aceptada
export async function getDetallePostulacion(idPostulacion,config) {
  
  try {
    const response = await axios.get(URL_API + `postulaciones/postulaciones/${idPostulacion}/datos`,config);
    const data = response.data;
   
    return {
      idPostulacion: data.idPostulacion,
      tituloPublicacion: data.titulo,
      nombreUsuario: data.nombreUsuario,
      fechaPostulacion: data.fechaPostulacion,
      direccion: {
        municipio: data.municipio,
        calle: data.calle,
        colonia: data.colonia,
        codigoPostal: data.codigoPostal,
        numExt: data.numExt,
        numInt: data.numInt,
      },
      userImage: data.userImage,
      fechaAccionado: data.fechaAccionado,
      fechaTrabajo: data.fechaTrabajo,
      horaTrabajo: data.horaTrabajo,
    };
  } catch (error) {
    console.error('Error al obtener los detalles de la postulación:', error);
    throw error;
  }
}
