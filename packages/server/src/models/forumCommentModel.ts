import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import { User } from './userModel'
import { ForumTopic } from './forumTopicModel'
import { InferAttributes, InferCreationAttributes } from 'sequelize'

@Table({ tableName: 'forum_comments' })
export class ForumComment extends Model<
  InferAttributes<ForumComment>,
  InferCreationAttributes<ForumComment, { omit: 'id' | 'user' | 'topic' }>
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare text: string

  @ForeignKey(() => ForumComment)
  @Column
  declare parentId?: number

  @ForeignKey(() => User)
  @Column
  declare userId: number

  @ForeignKey(() => ForumTopic)
  @Column
  declare topicId: number

  @BelongsTo(() => User)
  declare user: User

  @BelongsTo(() => ForumTopic)
  declare topic: ForumTopic
}
