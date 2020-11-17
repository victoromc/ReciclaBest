const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        dropDups: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
mongoose.model('usuarios', UsuarioSchema);
module.exports = mongoose.model('usuarios');