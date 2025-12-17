import express from 'express'

const app = express()
app.use(express.json())

const users = []

// POST - cadastrar usuário
app.post('/usuarios', (req, res) => {
    const usuario = req.body

    users.push(usuario)

    res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso',
        usuario
    })
})

// GET - listar usuários
app.get('/usuarios', (req, res) => {
    res.status(200).json(users)
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
