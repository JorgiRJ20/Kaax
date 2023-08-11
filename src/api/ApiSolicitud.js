import axios from 'axios';

const BASE_URL = 'http://192.168.100.12:8080/kaax/api/v1/';

const getSolicitudes = () => {
  return axios.get(`${BASE_URL}solicitud`)
  .then(response => {
    const data = response.data.map(solicitud => ({
        titulo: solicitud[0],
        descripcion: solicitud[1],
        idUsuario: solicitud[2],
        nameUser: solicitud[3],
        precio: solicitud[4],
      }));
    console.log('Datos de la API:', data); // Agrega este console.log para verificar los datos obtenidos
    return data;
  })
    .catch(error => {
      console.error('Error al obtener las solicitudes:', error);
      return [];
    });
};

export { getSolicitudes };