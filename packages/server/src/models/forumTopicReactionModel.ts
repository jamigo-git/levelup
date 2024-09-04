import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './userModel'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { ForumTopic } from './forumTopicModel'

@Table({
  timestamps: false,
  tableName: 'topic_reactions',
})
export class ForumTopicReaction extends Model<
  InferAttributes<ForumTopicReaction>,
  InferCreationAttributes<ForumTopicReaction, { omit: 'id' | 'user' | 'topic' }>
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

  @ForeignKey(() => ForumTopic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare topicId: number

  @BelongsTo(() => ForumTopic)
  declare topic: ForumTopic

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare emoji: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare unified: string
}
