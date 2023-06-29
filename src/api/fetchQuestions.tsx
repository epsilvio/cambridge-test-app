import * as $ from "jquery";

interface APIdata {
  name: string;
  heading: string;
  activities: string[];
}

const fetchData = (url: string): Promise<APIdata> => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: (data: APIdata) => {
        resolve(data);
      },
      error: (xhr, textStatus, errorThrown) => {
        reject(new Error(textStatus));
      },
    });
  });
};

export default fetchData;
