import axios from "axios";
import * as actions from "./actionsType";
import colaboradorServices from "./colaborador.services";
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

export const getColaborador = (filters) => async (dispatch, getState) => {
    try {
        dispatch({
            type : actions.LOADING_COLABORADOR,
            payload : true,
        });

        const resp = await colaboradorServices.getColaborador(filters);
        dispatch({
            type: actions.GET_COLABORADOR,
            payload: {
                colaboradores : resp.data,
                colaboradorLength : resp.data.length,
            },
        });
        dispatch({
            type : actions.COLABORADOR_FAIL,
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
            type : actions.COLABORADOR_FAIL,
            payload : message,
        });
    } finally {
        dispatch({
            type : actions.LOADING_COLABORADOR,
            payload : false,
        });
    }
}

export const saveColaborador = 
    (data, setShowModal) => async (dispatch, getState) => {
        try {
            dispatch({
                type : actions.SAVE_LOADING_COLABORADOR,
                payload : true,
            });
            
            const resp = await colaboradorServices.saveColaborador(data);
            const {colaboradores, colaboradorLength} = getState().colaborador;
            const __colaboradores = [...colaboradores, resp.data];

            dispatch({
                type : actions.GET_COLABORADOR,
                payload:{
                    colaboradores : __colaboradores,
                    colaboradorLength : colaboradorLength + 1,
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
                type : actions.SAVE_LOADING_COLABORADOR,
                payload : false,
            });
        }
    }

export const editColaborador = 
    (data, id, index, setShowModal) => async (dispatch, getState) => {
        try {
            dispatch({
                type: actions.SAVE_LOADING_COLABORADOR,
                payload: true,
            });

            const resp = await colaboradorServices.editColaborador(id, data);
            const {colaboradores, colaboradorLength} = getState().colaborador;
            const updateColaborador = [...colaboradores];
            updateColaborador[index] = resp.data;

            dispatch({
                type : actions.GET_COLABORADOR,
                payload : {
                    colaboradores : updateColaborador,
                    colaboradorLength : colaboradorLength,
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
                type : actions.SAVE_LOADING_COLABORADOR,
                payload : false,
            });
        }
}

export const deleteColaborador = 
    (data, id, index) => async (dispatch, getState) => {
    try {
        dispatch({
            type : actions.SAVE_LOADING_COLABORADOR,
            payload : true,
        });

        await colaboradorServices.deleteColaborador(id, data);
        const { colaboradores, colaboradorLength } = getState().colaborador;
        const deleteColaborador = [...colaboradores]
        deleteColaborador.splice(index,1);
        dispatch({
            type : actions.GET_COLABORADOR,
            payload : {
                colaboradores : deleteColaborador,
                colaboradorLength : colaboradorLength - 1,
            },
        });
        dispatch({
            type : actions.COLABORADOR_FAIL,
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
            type : actions.COLABORADOR_FAIL,
            payload : message,
        });
    } finally {
        dispatch({
            type : actions.SAVE_LOADING_COLABORADOR,
            payload: false,
        });
    }
}