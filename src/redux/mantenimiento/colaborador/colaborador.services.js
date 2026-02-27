import axiosClient from "../../../services/axiosClient";

class ColaboradorServices {
    getColaborador = (params) =>
        axiosClient.get(
            "colaboradores/",
            {
                headers : { "Content-Type" : "application/json"},
                params: params,
            }
        );

    saveColaborador = (data) =>
       axiosClient.post(
            "colaboradores/",
            data,
            {
                headers: {"Content-Type" : "application/json"},
            }
       );

    editColaborador = (id, data) =>
        axiosClient.put(
            `colaboradores/${id}`,
            data,
            {
                headers: { "Content-Type" : "application/json"},
            }
        );

    deleteColaborador = (id) =>
        axiosClient.delete(
            `colaboradores/${id}/`,
            {
                headers: {"Content-Type" : "application/json"},
            }
        );
        
}

export default new ColaboradorServices();