import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const ButtonAdd = ({showModal}) =>{
    return(
        <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon/>}
            sx={{width:"20%"}}
            onClick={showModal}
        > 
            Añadir 
        </Button>
    )
}

export default ButtonAdd;