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
        this.router.get('/personajes', this.personajeController.getAllPersonajes);
        this.router.get('/personajes/:id', this.personajeController.getPersonajeById);
        this.router.post('/personajes/', this.personajeController.createPersonaje);
        this.router.put('/personajes/:id', this.personajeController.updatePersonaje);
        this.router.delete('/personajes/:id', this.personajeController.deletePersonaje);
    }
}
