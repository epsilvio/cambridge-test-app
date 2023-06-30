// import * as $ from "jquery";
import axios from "axios";

// export const getDataFromJquery = (url: string): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     $.ajaxPrefilter(function (options) {
//       if (options.crossDomain && jQuery.support.cors) {
//         options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
//       }
//     });
//   });
// };

export const getDataFromAxios = async (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://cors-anywhere.herokuapp.com/" + url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
