import { Request } from '../helpers';

/**
 *
 * @param {Object} param
 * @param {('ongoing'|'history')} param.type
 * @returns
 */
export const getOrder = async ({ type = 'ongoing', page = 1 }) => {
  return Request({
    url: 'guest-order',
    data: {
      sort: 'desc',
      type,
      page,
    },
  });
};

export const detailOrder = async id => {
  return Request({
    url: 'guest-order/' + id,
  });
};

/**
 * 
 * @param {Object} param
 * @param {number} param.komodtiasId
 * @param {number} param.luasLahan
 * @param {string} param.scheduleDate
 * @param {string} param.alamat
 * @param {number} param.latitude
 * @param {number} param.longitude
 * @param {string} param.patokanTerdekat
 * @param {string} param.serviceType
 * @param {string} param.timeArguably
 * @param {array<{title: string, value: string}>} param.pestisida
 * @param {{name: string, phone: string}} param.buyer
 * @returns 
 */
export const storeOrder = async ({
  komodtiasId,
  luasLahan,
  scheduleDate,
  alamat,
  latitude,
  longitude,
  patokanTerdekat,
  serviceType,
  timeArguably,
  pestisida,
  buyer,
}) => {
  return Request({
    type: 'post',
    url: 'guest-order',
    data: {
      komoditas_id: komodtiasId,
      luas_lahan: luasLahan,
      luas_lahan_unit: 'ha', // satuan hectare
      schedule_date: scheduleDate,
      service_type: serviceType,
      time_arguably: timeArguably,
      pestisida: pestisida,
      buyer: buyer,
      destination_location: {
        address: alamat,
        latitude: latitude,
        longitude: longitude,
        patokan_terdekat: patokanTerdekat,
      },
    },
  });
};
