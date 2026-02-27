import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";

//diseño de componente
const BoxButtons = styled(Box) ({
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    width:"95%",
    padding:"2%",
    gap:5,
});

const ButtonsDialog = ({handleSubmit,onSubmit, saveLoading, onClose}) => { 
    return(
        <BoxButtons>
            <Button
                variant="contained"
                color="error"
                sx={{width:"49%"}}
                onClick={onClose}
            >
                cerrar    
            </Button>  
            <Button
                variant="contained"
                color="success"
                sx={{width:"49%"}}
                onClick={handleSubmit(onSubmit)}
                loading={saveLoading}
            >
                Guardar
            </Button> 
        </BoxButtons>
    )
};

export default ButtonsDialog;