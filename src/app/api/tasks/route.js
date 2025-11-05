import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { verificarToken } from '@/middleware/auth'

export default async function handler(req, res) {
  const userId = verificarToken(req)

  if (!userId) {
    return res.status(401).json({ erro: 'Não autenticado' })
  }

  const client = await clientPromise
  const db = client.db('gestorTarefas')

  // GET - Buscar tarefas do usuário
  if (req.method === 'GET') {
    try {
      const tarefas = await db.collection('tarefas')
        .find({ userId })
        .sort({ criadoEm: -1 })
        .toArray()

      res.status(200).json(tarefas)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Erro ao buscar tarefas' })
    }
  }

  // POST - Criar nova tarefa
  else if (req.method === 'POST') {
    try {
      const { nome, tema, checked } = req.body

      const novaTarefa = {
        nome,
        tema: tema || 'geral',
        checked: Boolean(checked),
        userId,
        criadoEm: new Date(),
        atualizadoEm: new Date()
      }

      const resultado = await db.collection('tarefas').insertOne(novaTarefa)

      res.status(201).json({ 
        ...novaTarefa, 
        _id: resultado.insertedId 
      })

    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Erro ao criar tarefa' })
    }
  }

  else {
    res.status(405).json({ erro: 'Método não permitido' })
  }
}