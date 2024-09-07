import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare second_name: string

  @Column({
    type: DataType.STRING,
  })
  declare display_name?: string | null

  @Column({
    type: DataType.STRING,
  })
  declare avatar?: string | null
}
