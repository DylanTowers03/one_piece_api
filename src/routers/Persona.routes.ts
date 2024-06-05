import { Router } from 'express';
import PersonaController from '../controllers/Persona.controller';

export class PersonaRoutes {
    public router: Router;
    private personaController=new PersonaController()

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/personas', this.personaController.getAllPersonas);
        this.router.get('/personas/:id', this.personaController.getPersonaOne);
        this.router.post('/personas', this.personaController.createPersona);
        this.router.post('/personas/usuario', this.personaController.createPersonaUsuario);
        this.router.put('/personas/:id', this.personaController.updatePersona);
        this.router.delete('/personas/:id', this.personaController.deletePersona);
    }
}

