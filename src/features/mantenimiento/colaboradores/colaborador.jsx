import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

//redux 
import { getColaborador, deleteColaborador } from "../../../redux/mantenimiento/colaborador/actions";

//importación de hooks
import { useConfiguredTable } from "../../../hooks/useConfiguredTable";
import { useActionCell } from "../../../hooks/useActionCell";

//componentes complementarios
import HeaderManten from "../../../components/mantenimiento/header";
import FormDialog from "./formDialog";

//importación de alertas
import swal from "sweetalert";

const Colaborador = () => {

    //redux
    const dispatch = useDispatch();
    const colaboradores = useSelector((state) => state.colaborador.colaboradores);
    const loading = useSelector((state) => state.colaborador.saveLoading);

    //declaracion de estados en react
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editItem, setEditItem] = useState({});

    //llamado del api cuando se monete el componente
    useEffect(() => {
      dispatch(getColaborador());
    },[dispatch]);

    console.log("Listado de colaboradores", colaboradores);

    const handleAdd = () => {
      setShowModal(true);
      setIsEdit(false);
      setEditItem(null);
    };

    const handleEdit = (data, index) => {
      console.log("Esta es la data a editar", data , "Este es el index", index); 
      setShowModal(true);
      setIsEdit(true);
      setEditItem({data, index});
    };

    const handleDelete = (data, index) => {
      swal({
        title:"¿Estas seguro de eliminar este registro?",
        text: "Una vez eliminado no podrá recuperarlo",
        icon:"warning",
        buttons: true,
        dangerMode: true,
      }) 
        .then((willDelete) => {
          if (willDelete) {
            data.estado = false;
            dispatch(deleteColaborador(data, data.id, index));
          }
        });
    };

    //declaración de variable que contendrá el hook actionCell
    const actionCell = useActionCell({ handleEdit, handleDelete });

    //Definición de columnas
    const columns = useMemo(()=>[
        {accessorKey: 'id', header:"ID"},
        {accessorKey: 'nombre', header:"Nombre"},
        {
          id:'acciones',
          header:'Acciones',
          Cell: actionCell,
        }
    ],[actionCell]);

    const table = useConfiguredTable(columns, colaboradores,{
        loading,
    });

    return(
      <div
        style={{
          width : "95%",
          height : "100%",
        }}
      >
        <HeaderManten handleAdd={handleAdd}/>
        <FormDialog 
          showModal={showModal}
          setShowModal={setShowModal}
          initialData={editItem}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        <Box sx={{padding:"2%", maxWidth:{xs:300, sm:500, md:800, lg:1300}}}>
          <MaterialReactTable table={table}/>
        </Box>
      </div>
    )
}

export default Colaborador;
