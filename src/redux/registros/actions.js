import axios from "axios";
import * as actions from "./actionsType";
import registroServices from "./registro.services";
import messages from "../../utilities/messages";
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

export const getRegistro = (filters) => async (dispatch, getState) => {
    try {
        dispatch({
            type : actions.LOADING_REGISTRO,
            payload : true,
        });

        const resp = await registroServices.getRegistro(filters);
        dispatch({
            type: actions.GET_REGISTRO,
            payload: {
                registros : resp.data,
                registroLength : resp.data.length,
            },
        });
        dispatch({
            type : actions.REGISTRO_FAIL,
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
            type : actions.REGISTRO_FAIL,
            payload : message,
        });
    } finally {
        dispatch({
            type : actions.REGISTRO_FAIL,
            payload : false,
        });
    }
}

export const saveRegistro = 
    (data, setShowModal) => async (dispatch, getState) => {
        try {
            dispatch({
                type : actions.SAVE_LOADING_REGISTRO,
                payload : true,
            });
            
            const resp = await registroServices.saveRegistro(data);
            const {registros, registroLength} = getState().registro;
            const __registros = [...registros, resp.data];

            dispatch({
                type : actions.GET_REGISTRO,
                payload:{
                    registros : __registros,
                    registroLength : registroLength + 1,
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
                type : actions.SAVE_LOADING_REGISTRO,
                payload : false,
            });
        }
    }

