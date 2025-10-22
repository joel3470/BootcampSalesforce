const app = require('./src/infrastructure/web/app');

const PORT = process.env.PORT || 3000;
//publicar el servicio
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 