import { Request, Response, Router } from 'express';
import * as todoController from '../controllers/TodosController';
import multer from 'multer';


const storageConfig = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, './temp');
    },
    filename: (request, file, cb) => {
        const radomName = Math.floor(Math.random() * 9999999)
        cb(null, `${radomName+Date.now()}.jpg`);
    }
})

const upload =  multer({
    storage: storageConfig
})

const router = Router();


router.get('/todo', todoController.all);

router.post('/todo', todoController.add);

router.put('/todo/:id', todoController.update);

router.delete('/todo/:id', todoController.remove);

router.post('/upload', upload.single('avatar'), todoController.uploadImage);

export default router;