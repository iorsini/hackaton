import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { verificarToken } from '@/middleware/auth'

export default async function handler(req, res) {
  const userId = verificarToken(req)

  if (!userId) {
    return res.status(401).json({ erro: 'Não autenticado' })
  }

  const { id } = req.query

  const client = await clientPromise
  const db = client.db('gestorTarefas')

  // GET - Buscar tarefa específica
  if (req.method === 'GET') {
    try {
      const tarefa = await db.collection('tarefas').findOne({ 
        _id: new ObjectId(id),
        userId 
      })

      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' })
      }

      res.status(200).json(tarefa)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Erro ao buscar tarefa' })
    }
  }

  // PUT - Atualizar tarefa
  else if (req.method === 'PUT') {
    try {
      const { nome, tema, checked } = req.body

      const resultado = await db.collection('tarefas').findOneAndUpdate(
        { _id: new ObjectId(id), userId },
        { 
          $set: { 
            nome,
            tema,
            checked: Boolean(checked),
            atualizadoEm: new Date()
          } 
        },
        { returnDocument: 'after' }
      )

      if (!resultado.value) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' })
      }

      res.status(200).json(resultado.value)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Erro ao atualizar tarefa' })
    }
  }

  // DELETE - Eliminar tarefa
  else if (req.method === 'DELETE') {
    try {
      const resultado = await db.collection('tarefas').deleteOne({ 
        _id: new ObjectId(id),
        userId 
      })

      if (resultado.deletedCount === 0) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' })
      }

      res.status(200).json({ mensagem: 'Tarefa eliminada com sucesso' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Erro ao eliminar tarefa' })
    }
  }

  else {
    res.status(405).json({ erro: 'Método não permitido' })
  }
}