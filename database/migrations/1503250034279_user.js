'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    //  this.create cria uma tabela no banco. O primeiro parâmetro recebido será
    // o nome da tabela, o segundo, uma função com os atributos da tabela.
    this.create('users', table => {
      table.increments() // Id, auto incrementado
      table
        .string('username', 80) // atributo username
        .notNullable()
        .unique()
      table
        .string('email', 254) // atributo email
        .notNullable()
        .unique()
      table.string('password', 80).notNullable() // atributo password
      table.string('token') // atributo token
      table.timestamp('token_created_at') // data de criação do token
      table.timestamps() // created_at e updated_at
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
