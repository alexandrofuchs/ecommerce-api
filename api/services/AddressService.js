const Address = require('../../database/models/Address');
const User = require('../../database/models/User');
const {  isNumeric, isValidUUID, maxAndMinLength, isWord } = require("../helpers/validate");


const createOrUpdate = async (req, res) => {
    try {
        const errors = [];
        const { city, cep, street, district, number, description, complement } = req.body;
        const address = {  city, cep, street, district, number, description, complement }
 
        if (!maxAndMinLength(description, 3, 100)) {
            errors.push({ field: 'description', error: 'deve conter entre 3 e 100 caracteres!' });
        }
        if (!maxAndMinLength(city, 3, 100) | !isWord(city)) {
            errors.push({ field: 'city', error: 'deve conter entre 3 e 100 caracteres e apenas letras!' });
        }
        if (!maxAndMinLength(district, 3, 100 | !isWord(district))){
            errors.push({ field: 'district', error: 'deve conter entre 3 e 100 caracteres e apenas letras!' });
        }
        if (!maxAndMinLength(street, 3, 100 | !isWord(street))){
            errors.push({ field: 'street', error: 'deve conter entre 3 e 100 caracteres e apenas letras!' });
        }
        if(!!complement){
            if (!maxAndMinLength(complement, 3, 100)) {
                errors.push({ field: 'complement', error: 'deve conter entre 3 e 100 caracteres!' });
            }
        }
        if (!isNumeric(cep)) {
            errors.push({ field: 'cep', error: 'cep inválido!' });
        }
        if (!isNumeric(number)) {
            errors.push({ field: 'number', error: 'numero inválido!' });
        }
        if(!isValidUUID(req.user.id)){
            errors.push({ field: 'userId', error: 'id usuário inválido!' });
        }

        if (errors.length > 0) {
            return res.status(400).json({ error: errors });
        }

        const foundUser = await User.findOne({
            where: { id: req.user.id }
        });

        if(!foundUser){
            return res.status(400).json({ error: 'usuário não encontrado' })
        }

        if (req.params.id) {
            await Address.update({ ...address, userId: req.user.id }, { where: { id: req.params.id } })
            return res.status(204).json();
        } else {
            const createdAddress = await Address.create({ ...address, userId: req.user.id });
            return res.status(201).json({ createdAddress });
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'createOrUpdate' });
    }
}

const findById = async (req, res) => {
    try {
        const foundAddress = await Address.findOne({
            where: { id: req.params.id },
        })
        
        if (!foundAddress) {
            return res.status(400).json({ error: 'not found!' })
        }
        return res.status(200).json({ data: foundAddress })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server Error' });
    }
}

const findAll = async (req, res) => {
    try {
        const foundAddresss = await Address.findAll();
        return res.status(200).json({ data: foundAddresss })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server Error' })
    }
}

const remove = async (req, res) => {
    try {
        await Address.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ message: 'Ok!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { createOrUpdate, findById, findAll, remove }