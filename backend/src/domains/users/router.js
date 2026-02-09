import { Router } from 'express';
import * as controller from './controller.js';

const usersRouter = Router();

usersRouter.get('/', 
    controller.getAllUsers
);

usersRouter.get('/:id', 
    controller.getUserById,    
);

usersRouter.post('/',
    controller.makeUser
);

usersRouter.put('/:id',
    controller.updateUser
);

usersRouter.delete('/:id',
    controller.deleteUser
);

export default usersRouter;