import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import { User } from './userModel'
import { ForumComment } from './forumCommentModel'
import { InferAttributes, InferCreationAttributes } from 'sequelize'

@Table({ tableName: 'forum_topics' })
export class ForumTopic extends Model<
  InferAttributes<ForumTopic>,
  InferCreationAttributes<ForumTopic, { omit: 'id' | 'user' }>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string

  @HasMany(() => ForumComment)
  declare comments?: ForumComment[]
}
