//configuración store base
import { configureStore } from "@reduxjs/toolkit";

//reducers
import ColaboradorReducer from "./mantenimiento/colaborador/colaborador";
import VehiculoReducer from "./mantenimiento/vehiculo/vehiculo";

export const store = configureStore({
    reducer:{
        colaborador: ColaboradorReducer,
        vehiculo : VehiculoReducer,
    },
});