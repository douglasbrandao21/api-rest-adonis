'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  // O Adonis não entende os relacionamentos apenas pela chave estrangeira.
  // Por isso, é necessário faze-los aqui pelo Model.

  // Cria o relacionamento de projeto e usuário
  user () {
    // Um projeto, pertence a um usuario. belongsTo espera o path do Model relacionado
    return this.belongsTo('App/Models/User')
  }

  tasks () {
    // Um projeto tem varias tarefas. hasMany também espera o path do Model relacionado
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
