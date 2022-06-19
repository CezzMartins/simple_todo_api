import express,{Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import todoRouter from './routes/todoRouter';



const server = express();
dotenv.config();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(todoRouter);

server.use((request: Request, response: Response) => {
    response.status(404);
    response.json({ error: "Pagina não encontrada."})
})

server.listen(process.env.PORT, () => {
    console.log('Server Is On!');
});