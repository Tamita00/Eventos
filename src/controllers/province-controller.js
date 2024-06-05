import { Router } from 'express';
import ProvinceService from '../services/province-service.js';
import Province from '../entities/province.js';
import ProvinceRepository from '../repositories/province-repository.js';
import LocationService from '../services/locations-service.js';
import Location from '../entities/locations.js';
import LocationRepository from '../repositories/locations-repository.js';


const router = Router();
const svc = new ProvinceService();

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



router.get('/province/:id/locations', async (req, res) => {
    try {
        const provinceId = req.params.id;

        // Verificar si la provincia existe
        const province = await Province.findById(provinceId);
        if (!province) {
            return res.status(404).json({ message: 'Provincia no encontrada' });
        }

        // Obtener todas las localidades de la provincia
        const locations = await Location.find({ province: provinceId });

        return res.status(200).json(locations);
    } catch (error) {
        console.error('Error al obtener las localidades de la provincia:', error);
        return res.status(500).json({ message: 'Error interno' });
    }
});