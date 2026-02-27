//logica reutilizable para botones eliminar y editar de la tabla
import { Box, IconButton } from "@mui/material";

//importacion de iconos
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const useActionCell = ({ handleEdit, handleDelete}) => {
    return ({row}) => {
        return (
            <Box sx={{display: 'flex',gap: '0.5rem'}}>
                <IconButton
                    color="primary"
                    onClick={()=> handleEdit(row.original, row.index)}
                >
                    <EditIcon/>
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={()=> handleDelete(row.original, row.index)}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        )
    }
}

