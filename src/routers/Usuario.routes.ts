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
        this.router.get('/get_usuarios', this.usuarioController.getAllUsuarios);
        this.router.get('/get_usuario/:id', this.usuarioController.getUsuarioById);
        this.router.post('/add_usuario', this.usuarioController.createUsuario);
        this.router.put('/update_usuario/:id', this.usuarioController.updateUsuario);
        this.router.delete('/delete_usuario/:id', this.usuarioController.deleteUsuario);
        this.router.get('/auth_usuario/:username/:password', this.usuarioController.authUsuario);
    }
}
