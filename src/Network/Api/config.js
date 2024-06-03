import { get } from "../../utils/Crypto";

let DEVELOPMENT_MODE = window.location.href.includes("localhost");
//let DEVELOPMENT_MODE = true;

let api, token;
if (DEVELOPMENT_MODE) {
  api = "http://127.0.0.1:3003/api/admin/";
  token = () => get("refresh_token");
} else {
  api = "https://dev.rideforyoutransport.com/api/admin";
  token = () => get("refresh_token");
}

export { api, token, DEVELOPMENT_MODE};
