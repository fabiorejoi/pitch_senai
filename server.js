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

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
