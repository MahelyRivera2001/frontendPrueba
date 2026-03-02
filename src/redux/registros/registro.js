import * as actions from "./actionsType";

const initialData = {
  loading: false,
  saveLoading: false,
  registroLength: 0,
  registros: [],
  registroError: "",
  formError: "",
};

export default function RegistroReducer(state = initialData, action) {
  switch (action.type) {
    case actions.LOADING_REGISTRO:      
      return { ...state, loading: action.payload };

    case actions.SAVE_LOADING_REGISTRO:
      return { ...state, saveLoading: action.payload };

    case actions.GET_REGISTRO:
      return {
        ...state,
        registros: action.payload.registros,
        registroLength: action.payload.registroLength,
      };
      
    case actions.FORM_FAIL:
      return { ...state, formError: action.payload };

    case actions.REGISTRO_FAIL:
      return { ...state, registroError: action.payload };

    default:
      return state;
  }
}
