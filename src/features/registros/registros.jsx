import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

//redux 
import { getRegistro} from "../../redux/registros/actions";

//importación de hooks
import { useConfiguredTable } from "../../hooks/useConfiguredTable";

//componentes complementarios
import HeaderManten from "../../components/mantenimiento/header";
import FormDialog from "./formDialog";

//importación de alertas
import swal from "sweetalert";

const Registros = () => {
    //redux
    const dispatch = useDispatch();
    const registros = useSelector((state) => state.registro.registros);
    const loading = useSelector((state) => state.registro.saveLoading);

    //declaracion de estados en react
    const [showModal, setShowModal] = useState(false);

    //llamado del api cuando se monete el componente
    useEffect(() => {
      dispatch(getRegistro());
    },[dispatch]);

    console.log("Listado de registros", registros);

    const handleAdd = () => {
      setShowModal(true);
    };

    //Definición de columnas
    const columns = useMemo(()=>[
      {accessorKey: 'id', header:"ID"},
      {accessorKey: 'Vehiculo.marca', header:"Vehiculo"},
      {accessorKey: 'Vehiculo.placa', header:"Placa"},
      {accessorKey: 'kilometraje', header:"kilometraje"},
      {accessorKey: 'Colaborador.nombre', header:"Colaborador"},
      {accessorKey: 'tipo', header:"Tipo"},
      {accessorKey: 'fecha', header:"Fecha"},
      {accessorKey: 'hora', header:"Hora"},
    ],[]);

    const table = useConfiguredTable(columns, registros,{
      loading,
    });

    return(
      <div
        style={{
            width : "100%",
            height : "100%",
        }}
      >
        <HeaderManten handleAdd={handleAdd}/>
        <FormDialog 
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Box sx={{padding:"2%", maxWidth:{xs:"95%", sm:"95%", md:"95%", lg:"95%"}}}>
          <MaterialReactTable table={table}/>
        </Box>
      </div>
    )
}

export default Registros;

