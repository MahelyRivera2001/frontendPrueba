import { Dialog, DialogTitle, DialogContent, TextField, FormControl } from "@mui/material";

//reacy native
import Select from 'react-select'

//esquema zod
import { z } from "zod";

//import hook
import { useEntityForm } from "../../hooks/useEntityForm";

//esquema de validación
const formSchema = z.object({
    vehiculoId: z
    .number({
        required_error: "El vehículo es obligatorio",
        invalid_type_error: "Vehículo inválido",
    })
    .int(),

    colaboradorId: z
    .number({
        required_error: "El colaborador es obligatorio",
        invalid_type_error: "Colaborador inválido",
    })
    .int(),

    kilometraje: z
    .number({
        required_error: "El kilometraje es obligatorio",
        invalid_type_error: "El kilometraje debe ser un número",
    })
    .int("El kilometraje debe ser un número entero")
    .nonnegative("El kilometraje no puede ser negativo"),

    tipo: z.enum(["ENTRADA", "SALIDA"], {
    required_error: "El tipo es obligatorio",
    }),
});

//componentes complementarios
import ButtonsDialog from "../../components/mantenimiento/buttonsDialog";

//redux
import { saveRegistro } from "../../redux/registros/actions";
import { getVehiculo } from "../../redux/mantenimiento/vehiculo/actions";
import { getColaborador } from "../../redux/mantenimiento/colaborador/actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const FormDialog = ({ showModal, setShowModal}) => {
    //dispatch
    const dispatch = useDispatch();

    //disparo de acciones
    useEffect(() => {
        dispatch(getVehiculo());
        dispatch(getColaborador());
    }, [dispatch]);

    //extraccion de datos, estado global(redux)
    const dataVehiculos = useSelector((state) => state.vehiculo.vehiculos);
    const dataColaboradores = useSelector((state) => state.colaborador.colaboradores);
    
    console.log("estos son los datos para vehiculos: ", dataVehiculos);
    console.log("estos son los datos para colaborador: ", dataColaboradores);

    //mapeo de datos para los selects
    const vehiculos = dataVehiculos.map(vh => ({
        value : vh.id,
        label : vh.marca
    }));

    const colaboradores = dataColaboradores.map(vh => ({
        value : vh.id,
        label : vh.nombre
    }));

    const opcionesTipo = [
        {label : "Entrada", value : "ENTRADA"},
        {label : "Salida", value : "SALIDA"},
    ]

    //desestructuración de datos
    const {
        onClose,
        control,
        register,
        handleSubmit,
        onSubmit,
        saveLoading,
        loading,
    } = useEntityForm ({
        formSchema,
        saveAction : saveRegistro,
        setShowModal,
        entityKey:"registro",
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
                    {"Agregar Registro"}
                </DialogTitle>
                <DialogContent sx={{display:"flex", flexDirection:"column", gap:2}}>
                    <Controller
                        name="vehiculoId"
                        control={control}
                        render={({ field }) => (
                            <>
                                <FormControl fullWidth>
                                    <Select
                                        {...field}
                                        placeholder={"Seleccione Vehiculo"}
                                        options={vehiculos}
                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        value={vehiculos.find(v => v.value === field.value) || null}
                                    />
                                </FormControl>
                            </>
                        )}
                    />
                    <Controller
                        name="colaboradorId"
                        control={control}
                        render={({ field }) => (
                            <>
                                <FormControl fullWidth>
                                    <Select
                                        placeholder={"Seleccione Colaborador"}
                                        options={colaboradores}
                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        value={colaboradores.find(v => v.value === field.value) || null}
                                    />
                                </FormControl>
                            </>
                        )}
                    />
                    <TextField
                        placeholder="Kilometraje"
                        {...register("kilometraje", {valueAsNumber: true})}
                    />
                    <Controller
                        name="tipo"
                        control={control}
                        render={({ field }) => (
                            <>
                                <FormControl fullWidth>
                                    <Select
                                        {...field}
                                        placeholder={"Seleccione Tipo"}
                                        options={opcionesTipo}
                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        value={opcionesTipo.find(v => v.value === field.value) || null}
                                        menuPortalTarget={document.body}
                                        styles={{ 
                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                            option: (provided) => ({...provided, color:"#242424"}) }}
                                    />
                                </FormControl>
                            </>
                        )}
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