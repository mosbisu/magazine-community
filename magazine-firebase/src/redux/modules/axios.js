import axios from "axios";

const apiClicent = axios.create({
  baseURL: "https://77542c60-077d-4ab3-8cf9-1d01bb5895b0.mock.pstmn.io/api/",
});

//회원가입
const registerAxios = async (id, pw, nickname) => {
  try {
    const response = await apiClicent.post("login", {
      username: id,
      pw: pw,
      nickname: nickname,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const axiosFunc = {
  registerAxios,
};

export { axiosFunc };
