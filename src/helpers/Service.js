import axios from "axios";
import { Alert } from "react-native";
import { getConfig, triggerError, triggerTokenExpired } from "../config";

const axiosIntance = ({ bearerToken, locale = "id", headers }) => {
  const { baseUrl, appToken, externalUser } = getConfig();

  const http = axios.create({
    baseURL: baseUrl,
    timeout: 50 * 1000, // 30s
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + (bearerToken ?? null),
      "Accept-Language": locale,
      "x-locale": locale,
      "x-app-token": appToken,
      "x-external-user": btoa(JSON.stringify(externalUser)),
      ...headers,
    },
  });

  // Log request
  http.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request));
    // console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
  });

  // Log response
  http.interceptors.response.use((response) => {
    console.log("Response:", JSON.stringify(response));
    // console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  });

  return http;
};

/**
 *
 * @param {Object} param
 * @param {String} param.url
 * @param {('get'|'post'|'path'|'delete')} param.type
 * @param {Object} param.data
 * @param {String} param.locale
 * @param {Object} param.headers
 * @param {Boolean} param.showSuccessMessage
 * @param {Boolean} param.showErrorMessage
 * @returns {Promise}
 */
export const Request = async ({
  url,
  type,
  data,
  locale,
  headers,
  showSuccessMessage = false,
  showErrorMessage = true,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = null;
      const intance = axiosIntance({
        locale,
        headers,
      });

      switch (type?.toLowerCase()) {
        case "post":
          response = await intance.post(url, data);
          break;
        case "patch":
          response = await intance.patch(url, data);
          break;
        case "delete":
          response = await intance.delete(url, {
            params: data,
          });
          break;
        default:
          response = await intance.get(url, {
            params: data,
          });
          break;
      }

      if (showSuccessMessage && response.data.message) {
        Alert.alert("Success", response.data.message);
      }

      resolve(response.data);
    } catch (e) {
      const error = {
        message: null,
        errors: {},
        errorField: {},
      };

      console.log(e);

      if (e.code === "ERR_NETWORK") {
        error["message"] = "Tidak ada koneksi internet";
      }

      if (e.message) {
        error["message"] = e.message;
      }

      if (e.response) {
        if (e.response.status == 0) {
          error["message"] = e.response._response;
        }

        if (e.response.data) {
          error["message"] = e.response.data.message;
          error["errors"] = e.response.data.errors;

          if (Object.keys(error.errors || {}).length) {
            for (let i in error.errors) {
              error["errorField"][i] = error.errors[i][0];
            }
          }

          if (e.response.data.message?.search(/^Unauthenticated/i) == 0) {
            // store.dispatch(logout());
            triggerTokenExpired();
            error["message"] = "Sesi sudah berakhir, silahkan login kembali";
          }
        }
      } else {
        error["message"] = "Tidak dapat terhubung ke server";
      }

      if (showErrorMessage && error.message) {
        // Alert.alert("Error", error.message);
        triggerError(error.message);
      }

      // force null value
      if (!Object.keys(error.errors || {}).length) {
        error["errors"] = null;
        error["errorField"] = null;
      }

      console.log("Error:", JSON.stringify(error, null, 2));

      return reject(error);
    }
  });
};
