# Proyecto NTT Data - API de Usuarios

API REST desarrollada con Node.js y Express.js que consume la API de RandomUser.me y permite descargar imágenes de perfil de usuarios.

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para APIs
- **Axios** - Cliente HTTP para peticiones
- **CORS** - Middleware para peticiones cross-origin
- **RandomUser.me API** - API externa para datos de usuarios

## Instalación

1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd PruebaNttData
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el servidor
```bash
npm start
```

El servidor se ejecutará en: `http://localhost:3000`

## Endpoints Disponibles

### Usuarios
- `GET /api/users` - Obtener lista de 10 usuarios aleatorios
- `GET /api/users/:id` - Obtener un usuario específico por ID

### Descarga de Imágenes
- `POST /api/users/:id/download-image` - Descargar imagen de un usuario
- `POST /api/users/download-multiple` - Descargar múltiples imágenes
- `GET /api/downloads` - Listar imágenes descargadas
- `GET /api/downloads/:fileName` - Descargar archivo específico

## Interfaz Web

Abrir el archivo `LlamadaAPI.html` en el navegador para probar la API con una interfaz visual.

**Características:**
- Lista usuarios en tabla
- Muestra preview de imágenes
- Botones de descarga individual
- Mensajes de estado

## Estructura del Proyecto

```
src/
├── application/services/     # Lógica de negocio
├── domain/models/           # Modelos de datos
└── infrastructure/web/      # Configuración web
    ├── controllers/         # Controladores HTTP
    ├── routes/             # Definición de rutas
    ├── app.js              # Configuración Express
    └── server.js           # Servidor HTTP
```

## Pruebas con Postman

Importar estas peticiones:
```
GET http://localhost:3000/api/users
POST http://localhost:3000/api/users/example@email.com/download-image
```

## Notas

- Las imágenes se guardan en la carpeta `downloads/`
- CORS está habilitado para peticiones desde navegador
- Los archivos tienen nombres únicos con timestamp

## Autor

Joel - Prueba Técnica NTT Data 


