import { Router } from 'express';
import EventosRepository from '../repositories/evento-repository.js';
import Evento from '../entities/evento.js'

const router = Router();
const eventosRepo = new EventosRepository();


//2 Listado de Eventos

router.get('/api/event/', async (req, res) => {
    try {
        const eventosTodos = await svc.EventosRepository.getAllAsync();
        if (eventosTodos.length > 0) {
            return res.status(200).json(eventosTodos);
        } else {
            return res.status(404).send('No se encontraron eventos.');
        }
    } catch (error) {
        console.error('Error al buscar eventos:', error);
        return res.status(500).send('Error interno.');
    }
});


//3 Búsqueda de un Evento

//Busqueda por nombre

router.get('/api/event/:name', async (req, res) => {
    try {
        const name = req.query.name;
        const eventosEncontrados = await svc.getByNombreAsync(name);
        if (eventosEncontrados.length > 0) {
            return res.status(200).json(eventosEncontrados);
        } else {
            return res.status(404).send('No se encontraron eventos con ese nombre.');
        }
    } catch (error) {
        console.error('Error al buscar eventos por nombre:', error);
        return res.status(500).send('Error interno.');
    }
});


//Busqueda por categoría

router.get('/api/event/:category', async (req, res) => {
    try {
        const category = req.query.category;
        const eventosEncontrados = await svc.getByCategoriaAsync(category);
        if (eventosEncontrados.length > 0) {
            return res.status(200).json(eventosEncontrados);
        } else {
            return res.status(404).send('No se encontraron eventos en esa categoría.');
        }
    } catch (error) {
        console.error('Error al buscar eventos por categoría:', error);
        return res.status(500).send('Error interno.');
    }
});

//Busqueda por fecha inicio

router.get('/:startdate', async (req, res) => {
    try {
        const startdate = req.query.start_date;
        const eventosEncontrados = await svc.getByFechaInicioAsync(startdate);
        if (eventosEncontrados.length > 0) {
            return res.status(200).json(eventosEncontrados);
        } else {
            return res.status(404).send('No se encontraron eventos con esa fecha de inicio.');
        }
    } catch (error) {
        console.error('Error al buscar eventos por fecha de inicio:', error);
        return res.status(500).send('Error interno.');
    }
});

//Busqueda por tag

router.get('/:tag', async (req, res) => {
    try {
        const tag = req.query.tag;
        const eventosEncontrados = await svc.getByTagAsync(tag);
        if (eventosEncontrados.length > 0) {
            return res.status(200).json(eventosEncontrados);
        } else {
            return res.status(404).send('No se encontraron eventos con ese tag.');
        }
    } catch (error) {
        console.error('Error al buscar eventos por tag:', error);
        return res.status(500).send('Error interno.');
    }
});


//4) Detalle de un Evento

//Get evento por id
router.get('/:id', async (req, res) => {
    try {
        const id = req.query.id;
        const eventosEncontrados = await svc.getByIdAsync(id);
        if (eventosEncontrados.length > 0) {
            return res.status(200).json(eventosEncontrados);
        } else {
            return res.status(404).send('No se encontraron eventos con ese id.');
        }
    } catch (error) {
        console.error('Error al buscar eventos por id:', error);
        return res.status(500).send('Error interno.');
    }
});


//5) LISTADO DE PARTICIPANTES

// Endpoint para filtrar por nombre
router.get('/:id/enrollment', async (req, res) => {
    try {
        const eventId = req.params.id;
        const name = req.query;

        const participantes = await participantesRepo.getByEventUserName(eventId, name);

        if (participantes.length > 0) {
            return res.status(200).json(participantes);
        } else {
            return res.status(404).send('No se encontraron participantes para este evento con el nombre proporcionado.');
        }
    } catch (error) {
        console.error('Error al obtener participantes inscritos por nombre:', error);
        return res.status(500).send('Error interno.');
    }
});

// Endpoint para filtrar por apellido
router.get('/:id/enrollment', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { last_name } = req.query;

        const filtros = { last_name };

        const participantes = await participantesRepo.getByEventUserLastName(eventId, filtros);

        if (participantes.length > 0) {
            return res.status(200).json(participantes);
        } else {
            return res.status(404).send('No se encontraron participantes para este evento con el apellido proporcionado.');
        }
    } catch (error) {
        console.error('Error al obtener participantes inscritos por apellido:', error);
        return res.status(500).send('Error interno.');
    }
});

// Endpoint para filtrar por nombre de usuario
router.get('/:id/enrollment', async (req, res) => {
    try {
        const eventId = req.params.id;
        const filtros = req.query;


        const participantes = await participantesRepo.getByEventUserUsername(eventId, filtros);

        if (participantes.length > 0) {
            return res.status(200).json(participantes);
        } else {
            return res.status(404).send('No se encontraron participantes para este evento con el nombre de usuario proporcionado.');
        }
    } catch (error) {
        console.error('Error al obtener participantes inscritos por nombre de usuario:', error);
        return res.status(500).send('Error interno.');
    }
});

// Endpoint para filtrar por asistencia
router.get('/:id/enrollment', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { attended } = req.query;

        const filtros = { attended: attended === 'true' };

        const participantes = await participantesRepo.getByEventUserAttended(eventId, filtros);

        if (participantes.length > 0) {
            return res.status(200).json(participantes);
        } else {
            return res.status(404).send('No se encontraron participantes para este evento con la asistencia proporcionada.');
        }
    } catch (error) {
        console.error('Error al obtener participantes inscritos por asistencia:', error);
        return res.status(500).send('Error interno.');
    }
});

// Endpoint para filtrar por rating
router.get('/:id/enrollment', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { rating } = req.query;

        const filtros = { rating: parseInt(rating) };

        const participantes = await participantesRepo.getByEventUserRating(eventId, filtros);

        if (participantes.length > 0) {
            return res.status(200).json(participantes);
        } else {
            return res.status(404).send('No se encontraron participantes para este evento con el rating proporcionado.');
        }
    } catch (error) {
        console.error('Error al obtener participantes inscritos por rating:', error);
        return res.status(500).send('Error interno.');
    }
});


//Creación, Edición, Eliminación de Eventos (CRUD)

// Endpoint para crear un nuevo evento
router.post('/', authenticateUser, async (req, res) => {
    try {
        const eventoData = req.body;
        // Validaciones de los datos del evento
        if (!eventoData.name || eventoData.name.length < 3 || !eventoData.description || eventoData.description.length < 3) {
            return res.status(400).send('El nombre y la descripción del evento deben tener al menos 3 caracteres.');
        }
        if (eventoData.price < 0 || eventoData.duration_in_minutes < 0) {
            return res.status(400).send('El precio y la duración deben ser valores positivos.');
        }

        // Crear el evento
        const newEvento = await eventosRepo.createAsync(eventoData);
        return res.status(201).json(newEvento);
    } catch (error) {
        console.error('Error al crear el evento:', error);
        return res.status(500).send('Error interno.');
    }
});

// Endpoint para actualizar un evento existente
router.put('/', authenticateUser, async (req, res) => {
    try {
        const eventoData = req.body;
        // Validaciones de los datos del evento
        if (!eventoData.name || eventoData.name.length < 3 || !eventoData.description || eventoData.description.length < 3) {
            return res.status(400).send('El nombre y la descripción del evento deben tener al menos 3 caracteres.');
        }
        if (eventoData.price < 0 || eventoData.duration_in_minutes < 0) {
            return res.status(400).send('El precio y la duración deben ser valores positivos.');
        }

        // Verificar si el evento existe y pertenece al usuario autenticado
        const existingEvento = await eventosRepo.getByIdAsync(eventoData.id);
        if (!existingEvento) {
            return res.status(404).send('Evento no encontrado.');
        }
        if (existingEvento.usuarioCreador !== req.user.id) {
            return res.status(401).send('No tienes permiso para editar este evento.');
        }

        // Actualizar el evento
        const updatedEvento = await eventosRepo.updateAsync(eventoData);
        return res.status(200).json(updatedEvento);
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
        return res.status(500).send('Error interno.');
    }
});

// Endpoint para eliminar un evento
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const eventId = req.params.id;
        // Verificar si el evento existe y pertenece al usuario autenticado
        const eventoToDelete = await eventosRepo.getByIdAsync(eventId);
        if (!eventoToDelete) {
            return res.status(404).send('Evento no encontrado.');
        }
        if (eventoToDelete.usuarioCreador !== req.user.id) {
            return res.status(401).send('No tienes permiso para eliminar este evento.');
        }
        // Eliminar el evento
        await eventosRepo.deleteByIdAsync(eventId);
        return res.status(200).send('Evento eliminado correctamente.');
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
        return res.status(500).send('Error interno.');
    }
});


//9) Inscripción a un Evento

// Endpoint para registrar a un usuario en un evento
router.post('/:id/enrollment', authenticateUser, async (req, res) => {
    try {
        const eventId = req.params.id;
        // Verificar si el evento existe
        const evento = await eventosRepo.getByIdAsync(eventId);
        if (!evento) {
            return res.status(404).send('Evento no encontrado.');
        }
        // Verificar si el evento ya ha sucedido o la fecha del evento es hoy
        const currentDate = new Date();
        if (evento.start_date <= currentDate) {
            return res.status(400).send('No puedes registrarte en un evento que ya ha sucedido o la fecha del evento es hoy.');
        }
        // Verificar si el evento está habilitado para la inscripción
        if (!evento.enabled_for_enrollment) {
            return res.status(400).send('El evento no está habilitado para la inscripción.');
        }
        // Verificar si el usuario ya está registrado en el evento
        const isUserEnrolled = await eventosRepo.isUserEnrolled(eventId, req.user.id);
        if (isUserEnrolled) {
            return res.status(400).send('El usuario ya está registrado en el evento.');
        }
        // Verificar si la capacidad máxima de registrados al evento ha sido excedida
        if (evento.max_assistance <= await eventosRepo.getNumberOfParticipantsAsync(eventId)) {
            return res.status(400).send('La capacidad máxima de registrados al evento ha sido excedida.');
        }
        // Registrar al usuario en el evento
        await eventosRepo.enrollUser(eventId, req.user.id);
        return res.status(201).send('Usuario registrado en el evento correctamente.');
    } catch (error) {
        console.error('Error al registrar al usuario en el evento:', error);
        return res.status(500).send('Error interno.');
    }
});

// Endpoint para remover a un usuario de un evento
router.delete('/:id/enrollment', authenticateUser, async (req, res) => {
    try {
        const eventId = req.params.id;
        // Verificar si el evento existe
        const evento = await eventosRepo.getByIdAsync(eventId);
        if (!evento) {
            return res.status(404).send('Evento no encontrado.');
        }
        // Verificar si el usuario está registrado en el evento
        const isUserEnrolled = await eventosRepo.isUserEnrolled(eventId, req.user.id);
        if (!isUserEnrolled) {
            return res.status(400).send('El usuario no está registrado en el evento.');
        }
        // Verificar si el evento ya ha sucedido o la fecha del evento es hoy
        const currentDate = new Date();
        if (evento.start_date <= currentDate) {
            return res.status(400).send('No puedes desinscribirte de un evento que ya ha sucedido o la fecha del evento es hoy.');
        }
        // Remover al usuario del evento
        await eventosRepo.unenrollUser(eventId, req.user.id);
        return res.status(200).send('Usuario removido del evento correctamente.');
    } catch (error) {
        console.error('Error al remover al usuario del evento:', error);
        return res.status(500).send('Error interno.');
    }
});


//10) Rating de un Evento

// Endpoint para que un usuario emita un rating y un feedback para un evento al que asistió
router.patch('/:id/enrollment/:rating', authenticateUser, async (req, res) => {
    try {
        const eventId = req.params.id;
        const rating = parseInt(req.params.rating);
        const observations = req.body.observations || '';

        // Verificar si el evento existe
        const evento = await eventosRepo.getByIdAsync(eventId);
        if (!evento) {
            return res.status(404).send('Evento no encontrado.');
        }
        // Verificar si el usuario está registrado en el evento
        const isUserEnrolled = await eventosRepo.isUserEnrolled(eventId, req.user.id);
        if (!isUserEnrolled) {
            return res.status(400).send('El usuario no está registrado en el evento.');
        }
        // Verificar si el evento ha finalizado
        const currentDate = new Date();
        if (evento.start_date > currentDate) {
            return res.status(400).send('El evento aún no ha finalizado.');
        }
        // Verificar si el rating está dentro del rango válido (entre 1 y 10)
        if (rating < 1 || rating > 10) {
            return res.status(400).send('El rating debe estar entre 1 y 10.');
        }
        // Actualizar el registro de asistencia del usuario con el rating y el feedback
        await eventosRepo.updateEnrollment(req.user.id, eventId, rating, observations);
        return res.status(200).send('Rating y feedback enviados correctamente.');
    } catch (error) {
        console.error('Error al emitir el rating y feedback para el evento:', error);
        return res.status(500).send('Error interno.');
    }
});


export default router;
