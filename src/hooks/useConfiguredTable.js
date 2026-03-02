//logica reutilizable para tablas
import { useMaterialReactTable} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

export const useConfiguredTable = (columns, data, options = {}) => {
    return useMaterialReactTable({
        columns,
        data,
        localization: MRT_Localization_ES, //traduccion al español
        state:{
            isLoading: options.localization,
            isSaving: options.saveLoading,
            showProgressBars: options.loading,
        },
        muiTableContainerProps : {
            sx:{
                maxWidth: "100%",
                overflowX: "auto",
            }
        },
        ...options,
    })
}