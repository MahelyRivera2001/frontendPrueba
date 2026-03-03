Documentación Prueba Técnica – FrontEnd

1. Descripción del Proyecto
   Esta aplicación web permite registrar vehículos y colaboradores así como llevar un control de entradas y salidas de cada vehículo. El sistema permite filtrar las entradas y salidas por fecha, colaborador y vehículo (utilización de tablas).

   El proyecto está compuesto por:

   Frontend: Aplicación React.js con interfaz moderna y responsive, utilizando mui, así mismo se utiliza axios para la conexión entre (frontend & backend).

   Base de Datos: PostgreSQL para almacenar vehículos, colaboradores(motoristas), entradas y salidas buscando mantener integridad de datos.

2. Estructura del Proyecto
   /frontendPrueba
   │
   ├─ /src
   │ ├─ /components # Componentes reutilizables (sidenav, headers, buttons... etc)
   │ ├─ /features # Páginas (componentes) principales: Vehículos, Colaboradores, Entradas/Salidas
   │ ├─ /hooks # logica reutilizable dentro de los componentes.
   │ ├─ /redux # logica & manejo de estados (axios)
   │ ├─ /routes # Configuración de rutas con React Router
   │ ├─ /services # Conexión con API (axios)
   │ ├─ /utilities # mensajes globales
   │ ├─ /App.jsx # Estructura principal & redirección (react-router)
   │ └─ main.jsx # Componente principal
   │
   ├─ package.json
   └─ README.md

3. Instalación & configuración local
   3.1 Clonar repositorio https://github.com/MahelyRivera2001/frontendPrueba.git
   3.2 Instalar dependencias : npm install
   3.3 crear archivo .env, y crear la siguiente variable:
   3.3.1: VITE_API_URL=http://localhost:5000/api/
   3.4 Ejecutar aplicación : npm run dev
