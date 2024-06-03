import { Router } from 'express';
import PersonajeController from '../controllers/PersonajeOnePiece';

export class PersonajeRoutes {
    public router: Router;
    private personajeController = new PersonajeController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/get_personajes', this.personajeController.getAllPersonajes);
        this.router.get('/get_personaje/:id', this.personajeController.getPersonajeById);
        this.router.post('/add_personaje/', this.personajeController.createPersonaje);
        this.router.put('/update_personaje/:id', this.personajeController.updatePersonaje);
        this.router.delete('/delete_personaje/:id', this.personajeController.deletePersonaje);
    }
}
