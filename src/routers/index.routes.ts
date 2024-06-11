import { PersonaRoutes } from "./Persona.routes";
import { PlayerRoutes } from "./Player.routes";
import { UsuarioRoutes } from "./Usuario.routes";


export default class indexRoutes{
    public routerPersona=new PersonaRoutes()
    public routerPlayer=new PlayerRoutes()
    public routerUsuario=new UsuarioRoutes()
}