import { Model, DataType, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Persona extends Model {
    public id!:number;
    public nombre!: string;
    public apellido!: string;
    public identificacion!: string;
    public correo!: string;
    public telefono!: string;
}

export interface IPersona {
    id:number;
    nombre: string;
    apellido: string;
    identificacion: string;
    correo: string;
    telefono: string;
}


Persona.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    identificacion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
},
    {
        tableName: "persona",
        sequelize: database,
        timestamps: true
    })