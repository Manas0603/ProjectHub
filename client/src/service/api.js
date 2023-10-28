import axios from "axios";
import { API_NOTIFICATION_MESSAGES } from "../constants/config.js";
import { SERVICE_URLS } from "../constants/config.js";

const API_URL = "http://localhost:8000";

const axiosInstance =  axios.create({
  baseUrl: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    // stop global loader
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

// if succes-> return{is succes: true , data:object}
const processResponse = (response) => {
  if (response?.status === 200) {
    return { issuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};
// if fail->return {is failure:true,status:string,msg:string,code:int}

const processError = (error) => {
  if (error.response) {
    //request made server responded with a ststus other
    //that fails out of the range 2.x.x
    console.log("ERror in response", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    //request bheji h par response nahi aaya h

    console.log("ERror in request", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: " ",
    };
  } else {
    //something happpened in frontend request that triigers error

    console.log("ERror in response", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API ,API_URL};
