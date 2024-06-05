import { Router } from 'express';
import CategoryService from '../services/category-service.js';
import Category from '../entities/categoria.js';
import CategoryRespository from '../repositories/category-repository.js';


const router = Router();
const svc = new CategoryService();

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
    const category = await svc.getByIdAsync(id);
    if (category !== null) {
        respuesta = res.status(200).json(category);
    } else {
        respuesta = res.status(404).send('Categoria no encontrada.');
    }
    return respuesta;
});

router.post('', async (req, res) => {
    try {
        const entity = req.body;
        const createdEntity = await svc.createAsync(entity);
        return res.status(201).json(createdEntity);
    } catch (error) {
        console.error('Error al crear la categoria:', error);
        return res.status(500).send('Error interno.');
    }
});

router.put('', async (req, res) => {
    try {
        const entity = req.body;
        const updatedEntity = await svc.updateAsync(entity);
        return res.status(200).json(updatedEntity);
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        return res.status(500).send('Error interno.');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await svc.deleteByIdAsync(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        return res.status(500).send('Error interno.');
    }
});

export default router;
