import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// POST - cadastrar usuário
app.post('/usuarios', async(req, res) => {
   
    const usuario = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso',
        usuario
    })
})

// GET - listar usuários
app.get('/usuarios', async (req, res) => {
    
    const users =  await prisma.user.findMany()
    
    res.status(200).json(users)
})

// PUT - atualizar usuário
app.put('/usuarios/:id', async(req, res) => {
   
    const usuario = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso',
        usuario
    })
})

// DELETE - deletar usuário
app.delete('/usuarios/:id', async(req, res) => {
    const usuario = await prisma.user.delete({
        where: {
            id: req.params.id
        },
    }) 

    res.status(200).json({
        mensagem: 'Usuário deletado com sucesso'
    })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
