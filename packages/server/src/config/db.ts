const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT } = process.env

import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { User } from '../models/userModel'
import { ForumTopic } from '../models/forumTopicModel'
import { ForumComment } from '../models/forumCommentModel'
import { ForumTopicReaction } from '../models/forumTopicReactionModel'

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || '0.0.0.0',
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'postgres',
  dialect: 'postgres',
  models: [User, ForumTopic, ForumComment, ForumTopicReaction],
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection with the database has been established successfully.')
  } catch (error) {
    console.log('POSTGRES_HOST: ', POSTGRES_HOST)
    console.error('Unable to connect to the database: ', error)
  }
}
