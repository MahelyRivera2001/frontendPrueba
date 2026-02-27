import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";

//esquema zod
import { z } from "zod";

//import hook
import { useEntityForm } from "../../../hooks/useEntityForm";

// Esquema de validación para formulario de Vehículo
const formSchema = z.object({
  marca: z
    .string()
    .nonempty("La marca es obligatoria"),
  modelo: z
    .string()
    .nonempty("El modelo es obligatorio"),
  placa: z
    .string()
    .nonempty("La placa es obligatoria")
    .regex(/^[A-Z0-9-]{1,10}$/, "Formato de placa inválido")
});

//componentes complementarios
import ButtonsDialog from "../../../components/mantenimiento/buttonsDialog";

//redux
import { saveVehiculo, editVehiculo } from "../../../redux/mantenimiento/vehiculo/actions";

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
        saveAction : saveVehiculo,
        editAction : editVehiculo,
        setShowModal,
        entityKey:"vehiculo",
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
                    {isEdit ? "Editar Vehiculo" : "Agregar Vehiculo"}
                </DialogTitle>
                <DialogContent sx={{display:"flex", flexDirection:"column", gap:2}}>
                    <TextField
                        placeholder="Marca"
                        {...register("marca")}
                        defaultValue={isEdit ? initialData?.data.marca : ""}
                    />
                    <TextField
                        placeholder="Modelo"
                        {...register("modelo")}
                        defaultValue={isEdit ? initialData?.data.modelo : ""}
                    />
                    <TextField
                        placeholder="Placa"
                        {...register("placa")}
                        defaultValue={isEdit ? initialData?.data.placa : ""}
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