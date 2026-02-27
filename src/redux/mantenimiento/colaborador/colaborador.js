import * as actions from "./actionsType";

const initialData = {
  loading: false,
  saveLoading: false,
  colaboradorLength: 0,
  colaboradores: [],
  colaboradorError: "",
  formError: "",
};

export default function ColaboradorReducer(state = initialData, action) {
  switch (action.type) {
    case actions.LOADING_COLABORADOR:      
      return { ...state, loading: action.payload };

    case actions.SAVE_LOADING_COLABORADOR:
      return { ...state, saveLoading: action.payload };

    case actions.GET_COLABORADOR:
      return {
        ...state,
        colaboradores: action.payload.colaboradores,
        colaboradorLength: action.payload.colaboradorLength,
      };
      
    case actions.FORM_FAIL:
      return { ...state, formError: action.payload };

    case actions.COLABORADOR_FAIL:
      return { ...state, colaboradorError: action.payload };

    default:
      return state;
  }
}
