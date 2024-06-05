import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/users-repository.js';
import User from '../entities/users.js'

const router = Router();
const svc = new UserRepository();

// Extraer datos del cuerpo de la solicitud
const { first_name, last_name, username, password } = req.body;

// Verificar si el usuario ya existe
const existingUser = await User.findOne({ username });

//6) Autenticación de Usuarios

router.post('/register', async (req, res) => {
    try {
        
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error interno' });
    }
});

router.post('/login', async (req, res) => {
    try {
        
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token en la respuesta
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error interno' });
    }
});


router.post('/register', async (req, res) => {
    try {
        
        // Verificar que los campos first_name y last_name no estén vacíos y tengan al menos 3 caracteres
        if (!first_name || first_name.length < 3 || !last_name || last_name.length < 3) {
            return res.status(400).json({ message: 'Los campos first_name y last_name son obligatorios y deben tener al menos 3 caracteres' });
        }


        // Verificar que el campo password no esté vacío y tenga al menos 3 caracteres
        if (!password || password.length < 3) {
            return res.status(400).json({ message: 'El campo password es obligatorio y debe tener al menos 3 caracteres' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({ first_name, last_name, username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error interno' });
    }
});