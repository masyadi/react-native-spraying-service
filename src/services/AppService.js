import axios from "axios";
import { Request } from "../helpers";

/**
 *
 * @param {Object} param
 * @param {String} param.latitude
 * @param {String} param.longitude
 * @returns
 */
export const geocoding = ({ latitude, longitude }) => {
  return Request({
    url: "https://nominatim.openstreetmap.org/reverse",
    data: {
      lat: latitude,
      lon: longitude,
      format: "json",
    },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0",
    },
  });
  // return axios.get("https://nominatim.openstreetmap.org/reverse", {
  //   params: {
  //     lat: latitude,
  //     lon: longitude,
  //     format: "json",
  //   },
  //   headers: {
  //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
  //   }
  // });
};
