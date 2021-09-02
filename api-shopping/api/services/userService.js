const User = require('../../database/models/User');
const { Op } = require('sequelize');
const { isEmpty, isAlphanumeric, maxAndMinLength, isValidEmail, minLength, isWord } = require("../helpers/validate");
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
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            cpf: foundUser.cpf,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt,
            isAdmin: foundUser.isAdmin
        }, process.env.ENCRYPT_KEY_TOKEN, {
            expiresIn: 60 * 60
        })

        return res.status(200).json({ token });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Server Error!" });
    }
}


const createOrUpdate = async (req, res) => {
    try {
        const errors = [];
        const user = { ...req.body }

        if(!maxAndMinLength(user.cpf, 11, 11)){
            errors.push('cpf invalido!')
        } 
        if(!isValidEmail(user.email)){
            errors.push('email invalido!')
        } 
        if(!isWord(user.firstName)){
            errors.push('nome invalido!')
        } 
        if(!isWord(user.lastName)){
            errors.push('sobrenome inválido!')
        } 
        if (!minLength(user.password, 8)) {
            errors.push("senha deve conter letras e numeros e minimo 8 caracteres!")  
        }

        if(errors.length > 0){
            return res.status(400).json(errors)
        }

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
                errors.push("email já registrado!");
            }
            if (user.cpf === foundUser.cpf) {
                errors.push("cpf já registrado!");
            }            
            return res.status(400).json(errors)
        }

        if (req.params.id) {
            await User.update(user, { where: { id: req.params.id } })
            return res.status(204).json();
        } else {
            console.log(user)
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