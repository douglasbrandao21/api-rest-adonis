'use strict'

const Raven = use('raven')
const Config = use('Config')

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Youch = use('youch')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    // Verifica se houve erro de validação dos atributos do Model
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    // Caso o erro seja outro, me retorna um objeto completo mostrando a descrição
    // do erro
    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJson = await youch.toJSON()
      response.status(error.status).send(errorJson)
    }
    return response.status(error.status)
  }
  async report (error, { request }) {
    Raven.config(Config.get('services.sentry.dsn'))
    Raven.captureException(error)
  }
}

module.exports = ExceptionHandler
