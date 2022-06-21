import express,{Request, Response, ErrorRequestHandler} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import todoRouter from './routes/todoRouter';
import { MulterError } from 'multer';


const server = express();
dotenv.config();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(todoRouter);

server.use((request: Request, response: Response) => {
    response.status(404);
    response.json({ error: "Pagina não encontrada."});
});



const errorRequestHandler: ErrorRequestHandler = (err, request, response, next) => {
    response.status(400);
    if(err instanceof MulterError){
        response.json({ Error: `File Error: ${err.code}}` })
    }else{
        console.log(err);
        response.json({ Error: "Huston, we have a Problem!" })
    }
}

server.use(errorRequestHandler)

server.listen(process.env.PORT, () => {
    console.log('Server Is On!');
});