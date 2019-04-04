'use strict'

const Route = use('Route')

// Rota de criação de usuário
Route.post('users', 'UserController.store').validator('User')

// Rota para realizar Login
Route.post('sessions', 'SessionController.store').validator('Session')

// Rotas que fazem a recuperação de senha
Route.post('forgot-password', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('forgot-password', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

// Rota que controla upload de arquivos
Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store'], ['Project']]]))

  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])
