import { Request, Response, Router } from 'express';
import * as todoControllers from '../controllers/TodosControllers';


const router = Router();

router.get('/', todoControllers.allTodos);



export default router;