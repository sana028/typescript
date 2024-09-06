import http from 'http';
import express,{ Express } from 'express';
import morgan from 'morgan';
import router from './router';
import mysql from 'mysql2';
import { environments } from './environments/dev.environemnt';

const app:Express = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({extended:false})); // ?

app.use('/api',router);

export const db=  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:`${environments.DB_Pass}`,
    database:`${environments.DB_Name}`
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });

const httpServer = http.createServer(app);

const PORT:any = process.env.port || 45320

httpServer.listen(PORT,()=>console.log(`The server is running on port ${PORT}`));