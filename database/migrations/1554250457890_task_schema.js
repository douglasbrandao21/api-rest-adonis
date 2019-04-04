'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', table => {
      table.increments()

      // Os seguintes trechos de códigos criam chaves estrangeiras com outras tabelas
      table
        .integer('project_id') // tipo e nome do campo, no caso, int project_id
        .unsigned() // apenas valores positivos
        .references('id') // atributo que o campo faz referência
        .inTable('projects') // tabela que pertence o atributo referenciado
        .onUpdate('CASCADE') // caso o valor referenciado seja atualizado, project_id também será
        .onDelete('CASCADE') // idem para delete
        .notNullable() // não nulo

      // Chave estrangeira que faz referência ao id de um usuário, ou seja:
      // Um usuário pode ter uma task, que deve ser a ele atrelada
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.string('title').notNullable()
      table.text('description')
      table.timestamp('due_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
