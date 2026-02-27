import * as actions from "./actionsType";

const initialData = {
  loading: false,
  saveLoading: false,
  vehiculoLength: 0,
  vehiculos: [],
  vehiculoError: "",
  formError: "",
};

export default function VehiculoReducer(state = initialData, action) {
  switch (action.type) {
    case actions.LOADING_VEHICULO:      
      return { ...state, loading: action.payload };

    case actions.SAVE_LOADING_VEHICULO:
      return { ...state, saveLoading: action.payload };

    case actions.GET_VEHICULO:
      return {
        ...state,
        vehiculos: action.payload.vehiculos,
        vehiculoLength: action.payload.vehiculoLength,
      };
      
    case actions.FORM_FAIL:
      return { ...state, formError: action.payload };

    case actions.VEHICULO_FAIL:
      return { ...state, vehiculoError: action.payload };

    default:
      return state;
  }
}
