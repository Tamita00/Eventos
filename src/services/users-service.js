import UserRepository from "../repositories/users-repository.js";

export default class UserService {
    getAllAsync = async () => {
        const repo = new UserRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new UserRepository();
        const returnObject = await repo.getByIdAsync(id);
        return returnObject;
    }

    createAsync = async (user) => {
        const repo = new UserRepository();
        const createdEntity = await repo.createAsync(user);
        return createdEntity;
    }

    updateAsync = async (user) => {
        const repo = new UserRepository();
        const updatedEntity = await repo.updateAsync(user);
        return updatedEntity;
    }

    deleteByIdAsync = async (id) => {
        const repo = new UserRepository();
        const success = await repo.deleteByIdAsync(id);
        return success;
    }
}



//AUTENTICACIÓN

// Mock de una base de datos de usuarios (reemplazar con tu lógica de base de datos real)
const users = [];

// Función para validar los campos de registro
function validateRegisterFields(user) {
    if (!user.first_name || user.first_name.length < 3) {
        return 'El campo first_name es inválido.';
    }
    if (!user.last_name || user.last_name.length < 3) {
        return 'El campo last_name es inválido.';
    }
    if (!user.username || !validateEmail(user.username)) {
        return 'El campo username es inválido.';
    }
    if (!user.password || user.password.length < 3) {
        return 'El campo password es inválido.';
    }
    return null;
}

// Endpoint para el registro de usuarios
router.post('/api/user/register', (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    // Validar los campos del registro
    const errorMessage = validateRegisterFields(req.body);
    if (errorMessage) {
        return res.status(400).json({ error: errorMessage });
    }

    // Verificar si el usuario ya está registrado
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'El usuario ya está registrado.' });
    }

    // Hash de la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Guardar el usuario en la base de datos (en este caso, en el array users)
    users.push({
        id: users.length + 1,
        first_name,
        last_name,
        username,
        password: hashedPassword
    });

    return res.status(201).json({ message: 'Usuario registrado exitosamente.' });
});

// Endpoint para el inicio de sesión
router.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = users.find(user => user.username === username);

    // Verificar si el usuario existe
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: 'Usuario o clave inválida.' });
    }

    // Generar y firmar el token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, 'clave_secreta', { expiresIn: '1h' });

    // Enviar el token como respuesta
    return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.', token });
});