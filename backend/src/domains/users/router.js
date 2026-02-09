import { Router } from 'express';
import * as controller from './controller.js';

let usersRouter = Router();

usersRouter.get('/', 
    controller.getAllUsers,    
);

usersRouter.get('/:id', 
    controller.getUserById,    
);

usersRouter.post('/',
    controller.makeUser
);

usersRouter.put('/',
    controller.updateUser
);

usersRouter.delete('/',
    controller.deleteUser
);

export default usersRouter;