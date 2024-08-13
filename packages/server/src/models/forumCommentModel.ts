import { Table, Column, Model, ForeignKey, BelongsTo, DataType, HasMany } from 'sequelize-typescript'
import { User } from './userModel'
import { ForumTopic } from './forumTopicModel'
import { InferAttributes, InferCreationAttributes } from 'sequelize'

@Table({ tableName: 'forum_comments' })
export class ForumComment extends Model<
  InferAttributes<ForumComment>,
  InferCreationAttributes<ForumComment, { omit: 'id' | 'user' | 'topic' | 'replies' }>
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
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  declare parentId: number | null

  @BelongsTo(() => ForumComment, 'parentId')
  declare parentComment?: ForumComment

  @ForeignKey(() => User)
  @Column
  declare userId: number

  @ForeignKey(() => ForumTopic)
  @Column
  declare topicId: number

  @BelongsTo(() => ForumTopic)
  declare topic: ForumTopic

  @BelongsTo(() => User)
  declare user: User

  @HasMany(() => ForumComment)
  declare replies: ForumComment[]
}
