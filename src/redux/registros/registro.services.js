import axiosClient from "../../services/axiosClient";

class RegistroServices {
    getRegistro = (params) =>
        axiosClient.get(
            "entradas-salidas/",
            {
                headers : { "Content-Type" : "application/json"},
                params: params,
            }
        );

    saveRegistro = (data) =>
       axiosClient.post(
            "entradas-salidas/",
            data,
            {
                headers: {"Content-Type" : "application/json"},
            }
       );
        
}

export default new RegistroServices();