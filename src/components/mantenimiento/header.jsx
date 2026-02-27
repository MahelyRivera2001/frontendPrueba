import { Box, Button} from "@mui/material";
import styled from "@emotion/styled";

//iconos
import AddIcon from '@mui/icons-material/Add';

const Header = styled(Box) ({
    width:"95%",
    height:"5vh",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center", //vertical
    alignItems:"end", //horizontal
    padding:"2%",
});

const HeaderManten = ({handleAdd}) => {
    return(
        <Header>
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon/>}
                sx={{width:"20%"}}
                onClick={handleAdd}
            >
                Añadir
            </Button>
        </Header>
    )
};

export default HeaderManten;