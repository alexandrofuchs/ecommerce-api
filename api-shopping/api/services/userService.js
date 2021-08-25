const User = require('../../database/models/User');
const { Op } = require('sequelize');
const { isEmpty, isAlphanumeric } = require("../helpers/validate");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (isEmpty(email) | isEmpty(password)) {
            return res.status(400).json({ message: "Credênciais inválidas!", data: null });
        }

        let foundUser = await User.findOne({
            where: {
                [Op.or]: [{ email }]
            }
        });

        if (!foundUser) {
            return res.status(400).json({ message: "Credênciais inválidas!", data: null });
        }

        if (!await bcrypt.compare(password, foundUser.password)) {
            return res.status(400).json({ message: "Credênciais inválidas!", data: null });
        }

        let token = await jwt.sign({
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt,
            isAdmin: foundUser.isAdmin
        }, process.env.ENCRYPT_KEY_TOKEN, {
            expiresIn: 60 * 60
        })

        return res.status(200).json({ message: "Ok!", data: token });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Server Error!", data: null });
    }
}


const createOrUpdate = async (req, res) => {
    try {
        const errors = [];
        const user = { ...req.body }

        const foundUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: user.email },
                    { cpf: user.cpf },
                ],  
            }, attributes: ['id', 'email', 'cpf']
        });

        if(!!foundUser && foundUser.id !== req.params.id){
            if (user.email === foundUser.email) {
                errors.push({ field: 'email', message: "email já registrado!" });
            }
            if (user.cpf === foundUser.cpf) {
                errors.push({ field: 'cpf', message: "cpf já registrado!" });
            }            
            if (user.password.length <= 8 | !isAlphanumeric(user.password)) {
                errors.push({ field: 'password', message: "senha deve conter letras e numeros e minimo 8 caracteres!" })  
            }
            return res.status(400).json({ error: [ ...errors ] })
        }

        if (req.params.id) {
            await User.update(user, { where: { id: req.params.id } })
            return res.status(204).json();
        } else {
            const createdUser = await User.create(user);
            createdUser.password = undefined;
            return res.status(201).json({ createdUser });
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'createOrUpdate' });
    }
}

const updatePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const { currentPassword, newPassword } = req.body; 

        if (isEmpty(currentPassword) | isEmpty(newPassword)) {
            return res.status(400).json({ message: "Valores inválidos!", data: null });
        }

        if (newPassword.length <= 8 | !isAlphanumeric(newPassword)) {
            return res.status(400).send({ message: "senha inválida", data: null })
        }

        let foundUser = await User.findOne({ where: { id: id } });

        if (!foundUser) {
            return res.status(400).json({ message: "usuário não encontrado!", data: null });
        }

        if(!await bcrypt.compare(currentPassword, foundUser.password)){
            return res.status(400).json({ message: "senhas não conferem!", data: null });
        }

        let password = await bcrypt.hash(newPassword, 12);

        let updatedUser = await User.update({ password }, {
            where: {
                id: id,
            },
            individualHooks: true
        });

        return res.status(200).json({ message: "Ok!", data: null });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({  message:"Server Error!", data: null });
    }
    
}

const findById = async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'firstName', 'lastName', 'cpf', 'email']
        })
        
        if (!foundUser) {
            return res.status(400).json({ error: 'não encontrado!' })
        }
        return res.status(200).json({ data: foundUser })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'FindById' });
    }
}

const findAll = async (req, res) => {
    try {
        const foundUsers = await User.findAll({ attributes: ['id', 'firstName', 'lastName', 'cpf', 'email'] });
        return res.status(200).json({ data: foundUsers })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Find' })
    }
}

const remove = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ message: 'Ok!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'FindById' });
    }
}

module.exports = { authenticate, createOrUpdate, updatePassword, findById, findAll, remove }