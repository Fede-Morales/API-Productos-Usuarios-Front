import axios from "axios";

const API_URL = "http://localhost:8080/products";

class ProductService {

    consulta(token){
        return axios
        .post(API_URL + "/productos", {token})
        .then((response) =>{
            if(response.data.token){
                localStorage.setItem("producto", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

   
}

export default new ProductService();