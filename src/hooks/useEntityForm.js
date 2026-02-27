//logica reutilizable para formularios
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useEntityForm ({
    formSchema,
    initialData,
    isEdit,
    saveAction,
    editAction,
    setShowModal,
    entityKey,
    setIsEdit,
    primaryKey,
    onSuccess, //callback que recibe los datos desde la accion
}){
    const dispatch = useDispatch();
    console.log("setShowModal recibido en useEntityForm:", setShowModal);
    const { loading, saveLoading, formError } = useSelector(
        (store) => store[entityKey] || {}
    );

    const username = "mahelygalvez@gmail.com";

    const {
        register,
        handleSubmit,
        formState: {errors}, 
        reset,
        control,
        getValues,
    } = useForm ({
        resolver: zodResolver(formSchema),
    });

    //resetear valores cuando cambia initialData
    useEffect(() =>{
      if (isEdit && initialData?.data) {
        reset(initialData.data);
      } else {
        reset({});
      }  
    }, [initialData, isEdit, reset]);

    const onClose = () => {
        setShowModal(false);
        setIsEdit(false);
        reset();
    };

    const onSubmit = async (data) => {
        if (!data.descripcion) delete data.descripcion;

        let resp;

        if (isEdit) {
            data.actualizado_por = username;
            resp = await dispatch(editAction(data, initialData.data[primaryKey], initialData.index, onClose));
            console.log("datos a editar:",data)
        } else {
            data.creado_por = username;
            resp = await dispatch(saveAction(data, onClose));
            console.log("datos a postear:",data);
            console.log("datos devueltos desde la accion:",resp);
        }

        // ejecuta el callback (onSucces) si la acción fué éxitosa
        if (resp?.success && typeof onSuccess === "function") {
            onSuccess(resp.data) //asignacion de los datos guardados retornados
        }

        reset();
    }

    return {
        register,
        handleSubmit,
        errors,
        control,
        onSubmit,
        onClose,
        formError, 
        loading, 
        saveLoading,
        reset,
        getValues,
    };
}
