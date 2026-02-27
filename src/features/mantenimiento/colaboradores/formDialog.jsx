import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";

//esquema zod
import { z } from "zod";

//import hook
import { useEntityForm } from "../../../hooks/useEntityForm";

//esquema de validación
const formSchema = z.object({
    nombre : z
        .string()
        .min(5,"El campo debe contener mínimo cinco caracteres")
        .max(500, "El campo debe contener un máximo de 500 caracteres"),
});

//componentes complementarios
import ButtonsDialog from "../../../components/mantenimiento/buttonsDialog";

//redux
import { saveColaborador, editColaborador } from "../../../redux/mantenimiento/colaborador/actions";

const FormDialog = ({ showModal, setShowModal, initialData, isEdit, setIsEdit}) => {
    //desestructuración de datos
    const {
        onClose,
        register,
        handleSubmit,
        onSubmit,
        saveLoading,
        loading,
    } = useEntityForm ({
        formSchema,
        initialData,
        isEdit,
        setIsEdit,
        saveAction : saveColaborador,
        editAction : editColaborador,
        setShowModal,
        entityKey:"colaborador",
        primaryKey:"id"
    });

    return(
        <Dialog
            open={showModal}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <form>
                <DialogTitle>
                    {isEdit ? "Editar Colaborador" : "Agregar Colaborador"}
                </DialogTitle>
                <DialogContent sx={{display:"flex", flexDirection:"column", gap:2}}>
                    <TextField
                        placeholder="Nombre Completo"
                        {...register("nombre")}
                        defaultValue={isEdit ? initialData?.data.nombre : ""}
                    />
                </DialogContent>
                <ButtonsDialog
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    saveLoading={saveLoading}
                    onClose={onClose}
                />
            </form>

        </Dialog>
    )
}

export default FormDialog;