import {createUser, findUser} from "./user.controller"

const jwt = require('jsonwebtoken')
const config = require('../config')

export const register = async (req, res) => {
    let username = await createUser(req, res);
    const token = jwt.sign({id: username}, config.SECRET, {
        expiresIn: 86400
    })
    res.status(201).json(token);
}

export const login = async (req, res) => {
    let foundUser = await findUser(req, res);
    if(foundUser) {
        const token = jwt.sign({id: foundUser.id_usuario}, config.SECRET, {
            expiresIn: 86400
        })
        res.status(200).json({token: token, rol: foundUser.tipo_usuario});
    }
}