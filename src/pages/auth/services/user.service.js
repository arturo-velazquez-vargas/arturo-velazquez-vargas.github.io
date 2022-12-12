import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getGreetings() {
    return axios.get(API_URL + "greeting", { headers: authHeader() });
  }
  
}

export default new UserService();
