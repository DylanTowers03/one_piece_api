import { Request, Response } from 'express';
import { IUsuario, Usuario } from '../models/Usuario.model';
import { Persona, IPersona } from '../models/Persona.model'
import { PasswordService } from '../util/PasswordService ';

export default class UsuarioController {

    public async getAllUsuarios(req: Request, res: Response) {
        try {
            const usuarios: IUsuario[] = await Usuario.findAll();
            const usuariosFiltrados = usuarios.map(usuario => ({
                id: usuario.id,
                createdAt: usuario.createdAt,
                updatedAt: usuario.updatedAt,
                username:"not visible",
                password:"not visible"
            }));
            res.status(200).json(usuariosFiltrados);
        } catch (error) {
            console.error("Error en getAllUsuarios", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    

    public async getUsuarioById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const usuario: IUsuario | null = await Usuario.findByPk(id);
            if (!usuario) {
                res.status(404).json({ mensaje: "Usuario no encontrado" });
                return;
            }
            res.status(200).json({
                id:usuario.id,
                createdAt:usuario.createdAt,
                updatedAt:usuario.updatedAt,
                username:"not visible",
                password:"not visible"
                
            });
        } catch (error) {
            console.error("Error en getUsuarioById", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async createUsuario(req: Request, res: Response) {
        const { password, personaId } = req.body;
        console.log(req.body);
        
        try {
            const persona: IPersona | null = await Persona.findByPk(personaId);
            if (!persona) {
                console.log("Persona no encontrada");
                
                res.status(404).json({ mensaje: "Persona no encontrada" });
                return;
            }
            const usuarioCreado: IUsuario = await Usuario.create({ username: persona.correo, password: await PasswordService.hashPassword(password), PersonaId: personaId });
            res.status(201).json({
                id:usuarioCreado.id,
                createdAt:usuarioCreado.createdAt,
                updatedAt:usuarioCreado.updatedAt
            });
        } catch (error) {
            console.error("Error en createUsuario", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    

    public async updateUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const { username, password, personaId } = req.body;
        try {
            const usuario: IUsuario | null = await Usuario.findByPk(id);
            if (!usuario) {
                res.status(404).json({ mensaje: "Usuario no encontrado" });
                return;
            }
            const passwordMatch = await PasswordService.comparePasswords(password, usuario.password);
            let newPassword;
            if (!passwordMatch) {
                newPassword = await PasswordService.hashPassword(password)
            } else {
                newPassword = usuario.password
            }

            await Usuario.update({ username, newPassword, PersonaId: personaId }, { where: { id } });
            res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
        } catch (error) {
            console.error("Error en updateUsuario", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async deleteUsuario(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const usuario: IUsuario | null = await Usuario.findByPk(id);
            if (!usuario) {
                res.status(404).json({ mensaje: "Usuario no encontrado" });
                return;
            }
            await Usuario.destroy({ where: { id } });
            res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
        } catch (error) {
            console.error("Error en deleteUsuario", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async authUsuario(req: Request, res: Response) {
        const { username, password } = req.params;
        const usuario: IUsuario | null = await Usuario.findOne({ where: { username } })
        if (!usuario) {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
            return;
        }
        const passwordMatch = await PasswordService.comparePasswords(password, usuario.password)
        if (passwordMatch && username == usuario.username) {
            res.status(200).json({ result: true })
        } else {
            res.status(200).json({ result: false })
        }
    }

   
}
