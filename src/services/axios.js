import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.38.106.41",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;

//경현
// http://13.125.18.54

// 재호
// http://3.38.106.41
