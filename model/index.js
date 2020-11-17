// Config
const express = require('express');
var cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/app-users', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Erro ao conectar com o MongoDB " + err))

// Models
const Usuario = require('./usuario');

// Midleware
app.use(cors());
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// POST
app.post('/usuario', function(req, res) {
    const data = req.body
    if (!data) {
        res.sendStatus(400);
    }
    if (!data.firstName) {
        res.status(400).json({ error: 'firstName obrigatório' });
        return;
    } else if (!data.lastName) {
        res.status(400).json({ error: 'lastName obrigatório' });
        return;
    } else if (!data.cpf) {
        res.status(400).json({ error: 'cpf obrigatório' });
        return;
    } else if (!data.password) {
        res.status(400).json({ error: 'password obrigatório' });
        return;
    }
    new Usuario(data).save()
        .then(() => {
            res.send('');
            res.sendStatus(200);
        })
        .catch((error) => {
            if (error.keyValue.cpf) {
                res.status(400).json({ error: 'CPF já cadastrado' })
            } else {
                res.status(400);
            }

        });
});

// GET all
app.get('/usuarios', function(req, res) {
    Usuario.find()
        .then((usuarios) => {
            res.send(usuarios);
        })
        .catch(() => {
            res.sendStatus(400)
        });
});

// GET one
app.get('/usuario/:userCpf', function(req, res) {
    const userCpf = req.params.userCpf;
    if (!userCpf) {
        res.status(400).json({ error: 'CPF é obrigatório' });
        return;
    }
    Usuario.findOne({ cpf: userCpf }).then((usuario) => {
        if(usuario){
            res.send(usuario);
        }else{
            res.sendStatus(404);
        }
    }).catch(() => {
        res.sendStatus(404);
    });
});

// PUT
app.put('/usuario/:userId', function(req, res) {
    const userId = req.params.userId;
    const data = req.body;
    if (!userId) {
        res.status(400).json({ error: 'userId obrigatório' });
        return;
    }

    if (!data) {
        res.status(400).json({ error: 'Body incorreto' });
        return;
    }

    Usuario.findByIdAndUpdate(userId, data)
        .then(() => {
            res.send('');
            res.sendStatus(200)
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

// DELETE
app.delete('/usuario/:userId', function(req, res) {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).json({ error: 'userId obrigatório' });
        return;
    }
    Usuario.findByIdAndRemove(userId)
        .then(() => {
            res.send('');
            res.sendStatus(200);
        })
        .catch(() => {
            res.sendStatus(404)
        });
});

// Subindo Server
app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080/');
});