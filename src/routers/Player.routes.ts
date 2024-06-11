import { Router } from 'express';
import PlayerController from '../controllers/Player.controller';

export class PlayerRoutes {
    public router: Router;
    private playerController = new PlayerController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/players', this.playerController.getAllPlayers);
        this.router.get('/players/:id', this.playerController.getPlayerById);
        this.router.post('/players/', this.playerController.createPlayer);
        this.router.put('/players/:id', this.playerController.updatePlayer);
        this.router.delete('/players/:id', this.playerController.deletePlayer);
    }
}
