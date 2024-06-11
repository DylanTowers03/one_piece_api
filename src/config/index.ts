import express,{Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import indexRoutes from '../routers/index.routes';

export class App{
    public Routes=new indexRoutes()
    app:Application;

    constructor(private port?:number|string){
        this.app=express();
        this.setting()
        this.middlewares()
        this.routes()
    }

    private setting(){
        this.app.set('port',this.port||3000)
    }

    private middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors())
    }

    private routes(){
        this.app.use('/api',this.Routes.routerPersona.router)
        this.app.use('/api',this.Routes.routerPlayer.router)
        this.app.use('/api',this.Routes.routerUsuario.router)
    }

    async start() {
        await this.app.listen(this.app.get('port'))
        console.log('Server on port', this.app.get('port'));
    }
}