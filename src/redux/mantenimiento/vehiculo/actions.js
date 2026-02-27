import axios from "axios";
import * as actions from "./actionsType";
import vehiculoServices from "./vehiculo.services";
import messages from "../../../utilities/messages";
import { toast } from "react-toastify";

const toastOptions = {
    position : "top-rigth",
    autoClose : 5000,
    hideProgressBar : false,
    closeOnClick : true,
    pauseOnHover : true,
    draggable : true,
    progress: undefined,
    theme:"ligth"
};

export const getVehiculo = (filters) => async (dispatch, getState) => {
    try {
        dispatch({
            type : actions.LOADING_VEHICULO,
            payload : true,
        });

        const resp = await vehiculoServices.getVehiculo(filters);
        dispatch({
            type: actions.GET_VEHICULO,
            payload: {
                vehiculos : resp.data,
                vehiculoLength : resp.data.length,
            },
        });
        dispatch({
            type : actions.VEHICULO_FAIL,
            payload : "",
        });
    } catch (ex) {
        let message = null;
        if (axios.isAxiosError(ex)) {
            if (ex.response?.status) {
                switch (ex.response.status) {
                    case 400:
                        message = messages.message_400 + "" + ex.response.statusText;
                        break;
                    case 404:
                        message = messages.message_404 + "" + ex.response.statusText;
                        break;
                    case 500:
                        message = messages.message_500 + "" + ex.response.statusText;
                        break;                
                    default:
                        message = ex.response.data;
                        break;
                }
            } else {
                message = 
                    ex.message === "Network Error" ? messages.message_network_error : ex.message;
            }
        } else {
            message =
                ex.message === "Network Error" ? messages.message_network_error : ex.message;
        }
        dispatch({
            type : actions.VEHICULO_FAIL,
            payload : message,
        });
    } finally {
        dispatch({
            type : actions.LOADING_VEHICULO,
            payload : false,
        });
    }
}

export const saveVehiculo = 
    (data, setShowModal) => async (dispatch, getState) => {
        try {
            dispatch({
                type : actions.SAVE_LOADING_VEHICULO,
                payload : true,
            });
            
            const resp = await vehiculoServices.saveVehiculo(data);
            const {vehiculos, vehiculoLength} = getState().vehiculo;
            const __vehiculos = [...vehiculos, resp.data];

            dispatch({
                type : actions.GET_VEHICULO,
                payload:{
                    vehiculos : __vehiculos,
                    vehiculoLength : vehiculoLength + 1,
                },
            });
            dispatch({
                type: actions.FORM_FAIL,
                payload: "",
            });
            setShowModal(false);
            toast.success(messages.message_exito_guardado, toastOptions);
        } catch (ex) {
            let message = null;
            if (axios.isAxiosError(ex)) {
                if (ex.response?.status) {
                    switch (ex.response.status) {
                        case 400:
                            message = messages.message_400 + "" + ex.response.statusText;
                            break;
                        case 404:
                            message = messages.message_404 + " " + ex.response.statusText;
                            break;
                        case 500:
                            message = messages.message_500 + "" + ex.response.statusText;
                            break;
                        default:
                            message = ex.response.data;
                            break;
                    }
                } else {
                    message =
                        ex.message === "Network Error" ? messages.message_network_error : ex.message;
                }
            } else {
                message =
                    ex.message === "Network Error" ? messages.message_network_error : ex.message;
            }
            dispatch({
                type : actions.FORM_FAIL,
                payload : message,
            });
        } finally {
            dispatch({
                type : actions.SAVE_LOADING_VEHICULO,
                payload : false,
            });
        }
    }

export const editVehiculo = 
    (data, id, index, setShowModal) => async (dispatch, getState) => {
        try {
            dispatch({
                type: actions.SAVE_LOADING_VEHICULO,
                payload: true,
            });

            const resp = await vehiculoServices.editVehiculo(id, data);
            const {vehiculos, vehiculoLength} = getState().vehiculo;
            const updateVehiculo = [...vehiculos];
            updateVehiculo[index] = resp.data;

            dispatch({
                type : actions.GET_VEHICULO,
                payload : {
                    vehiculos : updateVehiculo,
                    vehiculoLength : vehiculoLength,
                }
            });

            dispatch({
                type : actions.FORM_FAIL,
                payload : "",
            });

            setShowModal(false);
            toast.success(messages.message_exito_editado, toastOptions);
        } catch (ex) {
            let message = null;
            if (axios.isAxiosError(ex)) {
                if (ex.response?.status) {
                    switch (ex.response.status) {
                        case 400:
                            message = messages.message_400 + "" + ex.response.statusText;
                            break;
                        case 404:
                            message = messages.message_404 + "" + ex.response.statusText;
                            break;
                        case 500:
                            message = messages.message_500 + "" + ex.response.statusText;
                            break;
                        default:
                            message = ex.response.data;
                            break;
                    }
                } else {
                    message = 
                        ex.message === "Network Error" ? messages.message_network_error : ex.message;
                }
            } else {
                message = 
                    ex.message === "Network Error" ? messages.message_network_error : ex.message;
            }
            dispatch({
                type : actions.FORM_FAIL,
                payload : message,
            });
        } finally {
            dispatch({
                type : actions.SAVE_LOADING_VEHICULO,
                payload : false,
            });
        }
}

export const deleteVehiculo = 
    (data, id, index) => async (dispatch, getState) => {
    try {
        dispatch({
            type : actions.SAVE_LOADING_VEHICULO,
            payload : true,
        });

        await vehiculoServices.deleteVehiculo(id, data);
        const { vehiculos, vehiculoLength } = getState().vehiculo;
        const deleteVehiculo = [...vehiculos]
        deleteVehiculo.splice(index,1);
        dispatch({
            type : actions.GET_VEHICULO,
            payload : {
                vehiculos : deleteVehiculo,
                vehiculoLength : vehiculoLength - 1,
            },
        });
        dispatch({
            type : actions.VEHICULO_FAIL,
            payload : "",
        });
        toast.success(messages.message_exito_eliminado,toastOptions);
    } catch (ex) {
        let message = null;
        if (axios.isAxiosError(ex)) {
            if (ex.response?.status) {
                switch (ex.response.status) {
                    case 400:
                        message = messages.message_400 + "" + ex.response.statusText;
                        break;
                    case 404:
                        message = messages.message_404 + "" + ex.response.statusText;
                        break;
                    case 500:
                        message = messages.message_500 + "" + ex.response.statusText;
                        break;              
                    default:
                        message = ex.response.data;
                        break;
                }
            } else {
                message = 
                    ex.message === "Network Error" ? messages.message_network_error : ex.message;
            }
        } else {
            message =
                ex.message === "Network Error" ? messages.message_network_error : ex.message;
        }
        dispatch({
            type : actions.VEHICULO_FAIL,
            payload : message,
        });
    } finally {
        dispatch({
            type : actions.SAVE_LOADING_VEHICULO,
            payload: false,
        });
    }
}