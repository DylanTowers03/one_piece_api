import { Request, Response } from "express";
import {
    JugadorNBA,
    IJugadorNBA,
} from "../models/Player.model";

export default class PlayerController {
    public async getAllPlayers(req: Request, res: Response) {
        try {
            const players: IJugadorNBA[] =
                await JugadorNBA.findAll();
            res.status(200).json(players);
        } catch (error) {
            console.error("Error en getAllPlayers", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async getPlayerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const player: IJugadorNBA | null =
                await JugadorNBA.findByPk(id);
            if (!player) {
                res.status(404).json({ mensaje: "Player no encontrado" });
                return;
            }
            res.status(200).json(player);
        } catch (error) {
            console.error("Error en getPlayerById", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async createPlayer(req: Request, res: Response) {
        const { nombre, altura, posicion, equipo, playera, imagen} = req.body;
        try {
            const playerCreado: IJugadorNBA =
                await JugadorNBA.create({ nombre, altura, posicion, equipo, playera, imagen });
            res.status(201).json(playerCreado);
        } catch (error) {
            console.error("Error en createPlayer", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async updatePlayer(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, altura, posicion, equipo, playera, imagen} = req.body;
        try {
            const player: IJugadorNBA | null =
                await JugadorNBA.findByPk(id);
            if (!player) {
                res.status(404).json({ mensaje: "Player no encontrado" });
                return;
            }
            await JugadorNBA.update(
                {  nombre, altura, posicion, equipo, playera, imagen},
                { where: { id } }
            );
            res.status(200).json({ mensaje: "Player actualizado correctamente" });
        } catch (error) {
            console.error("Error en updatePlayer", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async deletePlayer(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const player: IJugadorNBA | null =
                await JugadorNBA.findByPk(id);
            if (!player) {
                res.status(404).json({ mensaje: "Player no encontrado" });
                return;
            }
            await JugadorNBA.destroy({ where: { id } });
            res.status(200).json({ mensaje: "Player eliminado correctamente" });
        } catch (error) {
            console.error("Error en deletePersonaje", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    
}
