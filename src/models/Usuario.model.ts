import { DataTypes, Model } from 'sequelize';
import { database } from '../database/db';
import { Persona } from './Persona.model';


export class Usuario extends Model {
  public username!: string;
  public password!: string;
  public PersonaId!: number;
  public id!: number;
  public createdAt!: string;
  public updatedAt!: string;
}

export interface IUsuario {
  id: number;
  username: string;
  password: string;
  PersonaId: number;
  createdAt: string;
  updatedAt: string;
}

Usuario.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PersonaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Persona,
      key: 'id'
    }
  }
}, {
  sequelize: database,
  tableName: 'usuario',
  timestamps: true
});

Usuario.belongsTo(Persona, { foreignKey: 'PersonaId' });
Persona.hasOne(Usuario, { foreignKey: 'PersonaId' });