import { Model, DataType, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Persona extends Model {
    public nombre!: string;
    public apellido!: string;
    public identificacion!: string;
    public correo!: string;
    public telefono!: string;
    public direccion!: string;
}

export interface IPersona {
    nombre: string;
    apellido: string;
    identificacion: string;
    correo: string;
    telefono: string;
    direccion: string;
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
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        tableName: "persona",
        sequelize: database,
        timestamps: true
    })