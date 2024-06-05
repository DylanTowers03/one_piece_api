import { Request, Response } from "express";
import {
    PersonajeOnePiece,
    IPersonajeOnePiece,
} from "../models/Personaje.model";

export default class PersonajeController {
    public async getAllPersonajes(req: Request, res: Response) {
        try {
            const personajes: IPersonajeOnePiece[] =
                await PersonajeOnePiece.findAll();
            res.status(200).json(personajes);
        } catch (error) {
            console.error("Error en getAllPersonajes", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async getPersonajeById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const personaje: IPersonajeOnePiece | null =
                await PersonajeOnePiece.findByPk(id);
            if (!personaje) {
                res.status(404).json({ mensaje: "Personaje no encontrado" });
                return;
            }
            res.status(200).json(personaje);
        } catch (error) {
            console.error("Error en getPersonajeById", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async createPersonaje(req: Request, res: Response) {
        const { nombre, nivel, fruta, rol, imagen,estado } = req.body;
        try {
            const personajeCreado: IPersonajeOnePiece =
                await PersonajeOnePiece.create({ nombre, nivel, fruta, rol, imagen,estado });
            res.status(201).json(personajeCreado);
        } catch (error) {
            console.error("Error en createPersonaje", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async updatePersonaje(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, nivel, fruta, rol, imagen,estado } = req.body;
        try {
            const personaje: IPersonajeOnePiece | null =
                await PersonajeOnePiece.findByPk(id);
            if (!personaje) {
                res.status(404).json({ mensaje: "Personaje no encontrado" });
                return;
            }
            await PersonajeOnePiece.update(
                { nombre, nivel, fruta, rol, imagen,estado },
                { where: { id } }
            );
            res.status(200).json({ mensaje: "Personaje actualizado correctamente" });
        } catch (error) {
            console.error("Error en updatePersonaje", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async deletePersonaje(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const personaje: IPersonajeOnePiece | null =
                await PersonajeOnePiece.findByPk(id);
            if (!personaje) {
                res.status(404).json({ mensaje: "Personaje no encontrado" });
                return;
            }
            await PersonajeOnePiece.destroy({ where: { id } });
            res.status(200).json({ mensaje: "Personaje eliminado correctamente" });
        } catch (error) {
            console.error("Error en deletePersonaje", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    public async getApiRouter(req: Request, res: Response) {
        try {
            res.status(200).json({
                personajes: [
                    {
                        GET: "http://158.247.124.44:4000/api/personajes/",
                        DESCRIPTION: "obtener todos los personajes",
                        body: [
                            {
                                id: 1,
                                nombre: "Monkey D. Luffy",
                                nivel: 100,
                                fruta: "Gomu Gomu no Mi",
                                rol: "Capitán",
                                imagen: "luffy.jpg",
                                createdAt: "2024-06-03T01:57:49.000Z",
                                updatedAt: "2024-06-03T01:57:49.000Z",
                            },
                            {
                                id: 2,
                                nombre: "Roronoa Zoro",
                                nivel: 95,
                                fruta: "",
                                rol: "Espadachín",
                                imagen: "zoro.jpg",
                                createdAt: "2024-06-03T01:57:59.000Z",
                                updatedAt: "2024-06-03T01:57:59.000Z",
                            },
                        ],
                    },
                    {
                        GET: "http://158.247.124.44:4000/api/personajes/{id}",
                        DESCRIPTION: "obtener un personaje",
                        body: {
                            id: 1,
                            nombre: "Monkey D. Luffy",
                            nivel: 100,
                            fruta: "Gomu Gomu no Mi",
                            rol: "Capitán",
                            imagen: "luffy.jpg",
                            createdAt: "2024-06-03T01:57:49.000Z",
                            updatedAt: "2024-06-03T01:57:49.000Z",
                        },
                    },
                    {
                        POST: "http://158.247.124.44:4000/api/personajes/",
                        DESCRIPTION: "crear un personaje",
                        body: {
                            nombre: "Monkey D. Luffy",
                            nivel: 100,
                            fruta: "Gomu Gomu no Mi",
                            rol: "Capitán",
                            imagen: "luffy.jpg",
                            createdAt: "2024-06-03T01:57:49.000Z",
                            updatedAt: "2024-06-03T01:57:49.000Z"
                        },
                    },
                    {
                        PUT: "http://158.247.124.44:4000/api/personajes/{id}",
                        DESCRIPTION: "actualizar un personaje",
                        body: {
                            nombre: "Monkey D. Luffy",
                            nivel: 100,
                            fruta: "Gomu Gomu no Mi",
                            rol: "Capitán",
                            imagen: "luffy.jpg",
                            createdAt: "2024-06-03T01:57:49.000Z",
                            updatedAt: "2024-06-03T01:57:49.000Z"
                        },
                    },
                ],
            });
        } catch (error) {
            res
                .status(500)
                .json({ error: `error en la soicitud getAllApiRoueter ${error}` });
        }
    }
}
