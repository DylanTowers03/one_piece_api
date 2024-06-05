import { Request, Response } from 'express';
import {Persona,IPersona} from "../models/Persona.model"
import { IUsuario, Usuario } from '../models/Usuario.model';
import { PasswordService } from '../util/PasswordService ';

export default class PersonaController {

    public async getAllPersonas(req:Request,res:Response){
        try {
            const persona:IPersona[]= await Persona.findAll();
            res.status(200).json(persona)
        } catch (error) {
            console.error("Error en getAllpersonas", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async getPersonaOne(req: Request, res: Response){
        const { id } = req.params;
        try {
            const persona: IPersona | null = await Persona.findByPk(id);
            if (!persona) {
                res.status(404).json({ mensaje: "Persona no encontrada" });
                return;
            }
            res.status(200).json(persona);
        } catch (error) {
            console.error("Error en getPersonaOne", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async createPersona(req: Request, res: Response){
        const { nombre, apellido, identificacion, correo, telefono, direccion }= req.body;
        try {
            const personaCreada: IPersona = await Persona.create({ nombre, apellido, identificacion, correo, telefono, direccion });
            res.status(201).json(personaCreada);
        } catch (error) {
            console.error("Error en createPersona", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    public async createPersonaUsuario(req: Request, res: Response){
        const { nombre, apellido, identificacion, correo, telefono, direccion,password }= req.body;
        try {
            const personaCreada: IPersona = await Persona.create({ nombre, apellido, identificacion, correo, telefono, direccion });
            const usuarioCreado: IUsuario = await Usuario.create({ username: personaCreada.correo, password: await PasswordService.hashPassword(password), PersonaId: personaCreada.id});
            
            console.log(personaCreada);
            
            res.status(201).json(personaCreada);
        } catch (error) {
            console.error("Error en createPersona", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async updatePersona(req: Request, res: Response){
        const { id } = req.params;
        const { nombre, apellido, identificacion, correo, telefono, direccion }= req.body;
        try {
            const persona: IPersona | null = await Persona.findByPk(id);
            if (!persona) {
                res.status(404).json({ mensaje: "Persona no encontrada" });
                return;
            }
            await Persona.update({ nombre, apellido, identificacion, correo, telefono, direccion }, { where: { id } });
            res.status(200).json({ mensaje: "Persona actualizada correctamente" });
        } catch (error) {
            console.error("Error en updatePersona", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async deletePersona(req: Request, res: Response){
        const { id } = req.params;
        try {
            const persona: IPersona | null = await Persona.findByPk(id);
            if (!persona) {
                res.status(404).json({ mensaje: "Persona no encontrada" });
                return;
            }
            await Persona.destroy({ where: { id } });
            res.status(200).json({ mensaje: "Persona eliminada correctamente" });
        } catch (error) {
            console.error("Error en deletePersona", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async getApiRouter(req: Request, res: Response) {
        try {
            res.status(200).json({
                personas: [
                    {
                        GET: "http://158.247.124.44:4000/api/personas/",
                        DESCRIPTION: "obtener todas las personas",
                        body: [
                            {
                                id:1,
                                nombre: "jane",
                                apellido: "doe",
                                identificacion: "12345678",
                                correo: "janedoe@example.com",
                                telefono: "0987654321",
                                direccion: "calle 1"
                            },
                            {
                                id:2,
                                nombre: "jane 2",
                                apellido: "doe 2",
                                identificacion: "12345678",
                                correo: "janedoe2@example.com",
                                telefono: "0987654321",
                                direccion: "calle 2"
                            }
                        ]
                    },
                    {
                        GET: "http://158.247.124.44:4000/api/personas/{id}",
                        DESCRIPTION: "obtener una persona",
                        body: {
                            id:1,
                            nombre: "jane",
                            apellido: "doe",
                            identificacion: "12345678",
                            correo: "janedoe@example.com",
                            telefono: "0987654321",
                            direccion: "calle 1"
                        }
                    },
                    {
                        POST: "http://158.247.124.44:4000/api/personas/",
                        DESCRIPTION: "crear una persona",
                        body: {
                            nombre: "jane",
                            apellido: "doe",
                            identificacion: "12345678",
                            correo: "janedoe@example.com",
                            telefono: "0987654321",
                            direccion: "calle 1"
                        }
                    },
                    {
                        PUT: "http://158.247.124.44:4000/api/personas/{id}",
                        DESCRIPTION: "actualizar una persona",
                        body: {
                            nombre: "jane",
                            apellido: "doe",
                            identificacion: "12345678",
                            correo: "janedoe@example.com",
                            telefono: "0987654321",
                            direccion: "calle 1"
                        }
                    }
                ]
            })
        } catch (error) {
            res.status(500).json({ error: `error en la soicitud getAllApiRoueter ${error}` })
        }
    }
   
}
