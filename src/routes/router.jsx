//estructuración de rutas

//iconos mui
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsIcon from '@mui/icons-material/Settings';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import PersonIcon from '@mui/icons-material/Person';

//componentes
import Colaborador from '../features/mantenimiento/colaboradores/colaborador';
import Vehiculos from '../features/mantenimiento/vehiculos/vehiculos';
import Registros from '../features/registros/registros';

const routes = [
    {
        type : "module",
        name : "Registro",
        key: "registro",
        route: "registro",
        icon : <AppRegistrationIcon />,
        component: Registros,
    },
    {
        type : "module",
        name : "Mantenimiento",
        key: "mantenimiento",
        route: "mantenimiento",
        icon : <SettingsIcon />,
        collapse: [
            {
                type: "submodule",
                name: "Vehículo",
                key: "vehiculo",
                route: "vehiculo",
                icon: <TimeToLeaveIcon />,
                component: Vehiculos,
            },
            {
                type: "submodule",
                name: "Colaborador",
                key: "colaborador",
                route: "colaborador",
                icon: <PersonIcon />,
                component: Colaborador,
            }
        ]
    }

]

export default routes;