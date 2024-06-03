import { DataTypes, Model } from 'sequelize';
import { database } from '../database/db';


export class PersonajeOnePiece extends Model{
  public nombre!: string;
  public nivel!: number;
  public fruta!: string;
  public rol!: string;
  public imagen!: string;
}

export interface IPersonajeOnePiece {
  nombre: string;
  nivel: number;
  fruta: string;
  rol: string;
  imagen: string;
}

PersonajeOnePiece.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fruta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: database,
  tableName: 'personaje_one_piece',
  timestamps:true
});

