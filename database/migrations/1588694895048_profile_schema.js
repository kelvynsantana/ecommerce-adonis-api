'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    this.create('profiles', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table
        .uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('cpf').notNullable().unique()
      table.string('rg').notNullable()
      table.string('tellphone').notNullable()
      table.timestamp('birthday').notNullable()
      table.enu('gender', ['male', 'female', 'not specified']).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
