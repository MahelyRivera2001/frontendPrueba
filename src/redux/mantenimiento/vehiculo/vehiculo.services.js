import axiosClient from "../../../services/axiosClient";

class VehiculoServices {
    getVehiculo = (params) =>
        axiosClient.get(
            "vehiculos/",
            {
                headers : { "Content-Type" : "application/json"},
                params: params,
            }
        );

    saveVehiculo = (data) =>
       axiosClient.post(
            "vehiculos/",
            data,
            {
                headers: {"Content-Type" : "application/json"},
            }
       );

    editVehiculo = (id, data) =>
        axiosClient.put(
            `vehiculos/${id}`,
            data,
            {
                headers: { "Content-Type" : "application/json"},
            }
        );

    deleteVehiculo = (id) =>
        axiosClient.delete(
            `vehiculos/${id}/`,
            {
                headers: {"Content-Type" : "application/json"},
            }
        );
        
}

export default new VehiculoServices();