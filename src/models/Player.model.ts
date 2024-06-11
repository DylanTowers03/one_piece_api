import { DataTypes, Model } from 'sequelize';
import { database } from '../database/db';

export class JugadorNBA extends Model {
  public nombre!: string;
  public altura!: number;
  public posicion!: string;
  public equipo!: string;
  public playera!: number;
  public imagen!: string;
}

export interface IJugadorNBA {
  nombre: string;
  altura: number;
  posicion: string;
  equipo: string;
  playera: number;
  imagen: string;
}

JugadorNBA.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  posicion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  equipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  playera: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: database,
  tableName: 'jugadores',
  timestamps: true
});
