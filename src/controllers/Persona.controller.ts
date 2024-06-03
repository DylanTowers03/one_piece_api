import { Request, Response } from 'express';
import {Persona,IPersona} from "../models/Persona.model"

export default class PersonaController {

    public async getAllPersonas(req:Request,res:Response){
        try {
            const persona:IPersona[]= await Persona.findAll();
            res.status(200).json(persona)
        } catch (error) {
            console.error("Error en getAllPeronas", error);
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
   
}
