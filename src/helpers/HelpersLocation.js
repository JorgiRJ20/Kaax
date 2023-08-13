/**
 * Función para convertir grados a radianes
 * @date 8/12/2023 - 5:00:49 PM
 * @author Alessandro Guevara
 *
 * @param {*} x
 * @returns {number}
 */
const rad = (x) => {
    return (x * Math.PI) / 180;
};


/**
 * Función para calcular la distancia en Metros entre dos puntos
 * @date 8/12/2023 - 4:58:19 PM
 * @author Alessandro Guevara
 *
 * @param {*} latitude1
 * @param {*} longitude1
 * @param {*} latitude2
 * @param {*} longitude2
 * @returns {*}
 */
const calculateLocationsDistance = (latitude1, longitude1, latitude2, longitude2) =>  {
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(latitude2 - latitude1);
    var dLong = rad(longitude2 - longitude1);
    var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(latitude1)) *
    Math.cos(rad(latitude2)) *
    Math.sin(dLong / 2) *
    Math.sin(dLong / 2);
    
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = d * 1000;
    return d.toFixed(1); //Retorna tres decimales
}

/**
 * Función para obtener la distancia en Metros de una ubicación con otra
 * @date 8/12/2023 - 4:49:34 PM
 * @author Alessandro Guevara
 *
 * @async
 * @param {*} movingLatitude - latitud de ubicación que estará en movimiento (Usuario)
 * @param {*} movingLongitude - longitud de ubicación que estará en movimiento (Usuario)
 * @param {*} staticLatitude - latitud de ubicación estática que no va a estar en movimiento (Lugar limpieza)
 * @param {*} staticLongitude - longitud de ubicación estática que no va a estar en movimiento (Lugar limpieza)
 * @returns {Promise resolve} - retornamos distancia calculada
 */
export const getLocationsDistance = async (movingLatitude, movingLongitude, staticLatitude, staticLongitude) => {
    return new Promise(async (resolve) => {
        var distancia = calculateLocationsDistance(movingLatitude, movingLongitude, staticLatitude, staticLongitude);
        resolve(distancia);
    });
}