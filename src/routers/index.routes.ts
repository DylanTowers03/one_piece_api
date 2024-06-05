import { PersonaRoutes } from "./Persona.routes";
import { PersonajeRoutes } from "./PersonajeOnePiece.routes";
import { UsuarioRoutes } from "./Usuario.routes";
import { All_Api_Router } from "./allApiRouter.routes";

export default class indexRoutes{
    public routerPersona=new PersonaRoutes()
    public routerPersonaje=new PersonajeRoutes()
    public routerUsuario=new UsuarioRoutes()
    public routerAll_Api_Router=new All_Api_Router()
}