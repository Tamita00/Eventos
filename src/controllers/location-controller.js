import { Router } from 'express';
import LocationService from '../services/locations-service.js';
import Location from '../entities/locations.js';
import LocationRepository from '../repositories/locations-repository.js';

const router = Router();
const svc = new LocationRepository();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if (returnArray !== null) {
        respuesta = res.status(200).json(returnArray);
    } else {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let respuesta;
    const province = await svc.getByIdAsync(id);
    if (province !== null) {
        respuesta = res.status(200).json(province);
    } else {
        respuesta = res.status(404).send('Provincia no encontrada.');
    }
    return respuesta;
});

router.post('', async (req, res) => {
    try {
        const entity = req.body;
        const createdEntity = await svc.createAsync(entity);
        return res.status(201).json(createdEntity);
    } catch (error) {
        console.error('Error al crear la provincia:', error);
        return res.status(500).send('Error interno.');
    }
});

router.put('', async (req, res) => {
    try {
        const entity = req.body;
        const updatedEntity = await svc.updateAsync(entity);
        return res.status(200).json(updatedEntity);
    } catch (error) {
        console.error('Error al actualizar la provincia:', error);
        return res.status(500).send('Error interno.');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await svc.deleteByIdAsync(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al eliminar la provincia:', error);
        return res.status(500).send('Error interno.');
    }
});

export default router;
