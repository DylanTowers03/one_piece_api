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
        this.router.get('/get_personas', this.personaController.getAllPersonas);
        this.router.get('/get_persona/:id', this.personaController.getPersonaOne);
        this.router.post('/add_persona/', this.personaController.createPersona);
        this.router.put('/update_persona/:id', this.personaController.updatePersona);
        this.router.delete('/delete_persona/:id', this.personaController.deletePersona);
    }
}

