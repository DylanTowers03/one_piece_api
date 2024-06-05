import { Request, Response } from "express"
export default class AllApiRouter {
    public async getAllApiRouter(req: Request, res: Response) {
        try {
            res.status(200).json({
               personas:"http://158.247.124.44:4000/api/personas/paths",
               usuarios:"http://158.247.124.44:4000/api/usuarios/paths",
               personajes:"http://158.247.124.44:4000/api/personajes/paths"
            })
        } catch (error) {
            res.status(500).json({ error: `error en la soicitud getAllApiRoueter ${error}` })
        }
    }
}