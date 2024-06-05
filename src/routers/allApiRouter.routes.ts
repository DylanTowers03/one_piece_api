import { Router } from 'express';
import AllApiRouter from '../controllers/AllApiRouter.controller';

export class All_Api_Router {
    public router: Router;
    private allApiRouter = new AllApiRouter();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.allApiRouter.getAllApiRouter);
    }
}
