import { Request, Response, Router } from 'express';
import { TodoModel } from '../models/todoModel';
import sharp from 'sharp';
import { unlink } from 'fs/promises';


export const all = async (request: Request, response: Response) => {
    const todoList = await TodoModel.findAll();
    response.json({ todoList })
}

export const add = async (request: Request, response: Response) => {
    const { title, description } = request.body;
    if(title){
        let newTodoItem = await TodoModel.create({
            title: title,
            description: description,
            completed: request.body.completed ? true : false
        })
        response.status(201);
        response.json({ item: newTodoItem });
    }
    response.json({ errror: "Dados não inivados corretamente. "});
}

export const update = async (request: Request, response: Response) => {
    const id: string = request.params.id;
    const todo = await TodoModel.findByPk(id);

    if(todo){
        if(request.body.title) todo.title = request.body.title;

        if(request.body.title) todo.description = request.body.description;

        if(request.body.completed) {            
           switch(request.body.completed.toLowerCase()) {
                case 'true':
                case '1':
                    todo.completed = true;
                    break;

                case 'false':
                case '0':
                    todo.completed = false;
                    break;
           }
        }
        
        await todo.save();
        response.json({ item: todo })
    }

    response.json({ error: "Item não encontrado."});
}

export const remove = async (request: Request, response: Response) => {
    const id = request.params.id;
    const todo = await TodoModel.findByPk(id);

    if(todo) todo.destroy();

    response.json();
}

export const uploadImage = async (request: Request, response: Response) => {
    
    if(request.file){
        const fileName: string = request.file.filename;
        await sharp(request.file.path)
            .resize(80, 80, { fit: sharp.fit.cover, position: 'center'})
            .toFormat('jpeg')
            .toFile(`./public/media/${fileName}.jpg`);
            
        await unlink(request.file.path);
        response.json({ image: `${fileName}.jpg Was saved!`});

    }else {
        response.status(400);
        response.json({ error: 'File Invalid! '});
    }

    response.json({ message: "Uplod completed!" });
}