import { PersonaRoutes } from "./Persona.routes";
import { PersonajeRoutes } from "./PersonajeOnePiece.routes";
import { UsuarioRoutes } from "./Usuario.routes";


export default class indexRoutes{
    public routerPersona=new PersonaRoutes()
    public routerPersonaje=new PersonajeRoutes()
    public routerUsuario=new UsuarioRoutes()
}