'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  // Método show vai receber params e response. Params para pegar o id do file
  // que vem na url da requisição
  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      // Verifica se tem um arquivo na requisição, caso não tenha, interrompe a
      // execução do método
      if (!request.file('file')) return

      // Método file seleciona inputs type="file", e recebe dois parâmetros:
      // primeiro parâmetro => atributo name do input, no caso name="file"
      // segundo parâmetro => validações, como tipo do arquivo, tamanho total, etc
      const upload = request.file('file', { size: '2mb' })

      // fileName será uma string com `${timestamp}.${fileExtension}`
      const fileName = `${Date.now()}.${upload.subtype}`

      // Faz de fato o upload do arquivo. Salva ele na pasta upload, dentro de tmp
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName // Nome do arquivo na pasta tmp
      })

      // Se o upload não funcionou, lança um erro
      if (!upload.moved()) {
        throw upload.error()
      }

      // Chama o model de arquivos, File, para guardar as informações do arquivo
      // no banco de dados.
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      // Retorna um erro caso tenha dado alguma coisa errada no try
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }
}

module.exports = FileController
