import { Router } from 'express';
import UsuarioController from '../controllers/Usuario.controller'; 

export class UsuarioRoutes {
    public router: Router;
    private usuarioController = new UsuarioController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/usuarios', this.usuarioController.getAllUsuarios);
        this.router.get('/usuarios/:id', this.usuarioController.getUsuarioById);
        this.router.post('/usuarios', this.usuarioController.createUsuario);
        this.router.put('/usuarios/:id', this.usuarioController.updateUsuario);
        this.router.delete('/usuarios/:id', this.usuarioController.deleteUsuario);
        this.router.get('/auth_usuario/:username/:password', this.usuarioController.authUsuario);
    }
}
