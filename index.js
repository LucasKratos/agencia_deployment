import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'


const app = express();

//Conectar la base de datos
db.authenticate()
    .then( ()=> console.log('Base de datos conectada') )
    .catch( error => console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    next();

})

//agregar bodyparser

app.use(express.urlencoded({extends: true}))

//Definir la carpeta public

app.use(express.static('public'));

//Agregar Router
app.use('/', router);


const host = process.env.HOST || '0.0.0.0'



app.listen(port, host, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${port}`)
});
