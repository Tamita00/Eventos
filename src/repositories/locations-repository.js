import DBConfig from '../configs/db-config.js';
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class LocationRepository {
    // Método para obtener todas las locations de forma asíncrona
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM locations';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // Método para obtener una locations por su ID de forma asíncrona
    getByIdAsync = async (id) => {
        let locations = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM locations WHERE ID = $1';
            const values = [51];
            const result = await client.query(sql, values);
            await client.end();
            locations = result.rows;
        } catch (error) {
            console.log(error);
        }

        return locations;
    }

    // Método que Retorna todos los event-location del location id enviado por parámetro, del usuario autenticado.
    getByIdAsync = async (id) => {
        let locations = null;
        const client = new Client(DBConfig);

        // Verifica si el usuario está autenticado
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Busca la location en la base de datos
        const locationRepository = new LocationRepository();
        const location = await locationRepository.getByIdAsync(id);

        // Si la location no existe, retorna un error 404
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        // Si la location existe, obtiene los event-locations asociados
        const eventLocations = await locationRepository.getEventLocationsAsync(id);

        // Retorna los event-locations y un código de estado 200
        return res.status(200).json(eventLocations);
    }




    
    // Método para crear una nueva location de forma asíncrona
    createAsync = async (entity) => {
        let CrearEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { name, id_province, latitude, longitude } = entity; // Suponiendo que 'entity' tiene un formato específico con 'name' y 'description'
            const sql = 'INSERT INTO locations (name, id_province, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [name, id_province, latitude, longitude];
            const result = await client.query(sql, values);
            createdEntity = result.rows[0]; // Suponiendo que el resultado devuelve la entidad creada
        } catch (error) {
            console.error("Error al crear la entidad:", error);
        } finally {
            await client.end();
        }
        return CrearEntity;
    }

    // Método para actualizar una provincia existente de forma asíncrona
    updateAsync = async (entity) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { id, name, id_province, latitude, longitude } = entity; // Suponiendo que 'entity' tiene un formato específico con 'id', 'name' y 'description'
            const sql = 'UPDATE locations SET name = $2, id_province = $3, latitude = $4, longitude = $5 WHERE id = $1 RETURNING *';
            const values = [id, name, description];
            const result = await client.query(sql, values);
            const updatedEntity = result.rows[0]; // Suponiendo que el resultado devuelve la entidad actualizada
            return updatedEntity;
        } catch (error) {
            console.error("Error al actualizar la entidad:", error);
        } finally {
            await client.end();
        }
    }

    // Método para eliminar una location por su ID de forma asíncrona
    deleteByIdAsync = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM locations WHERE id = $1';
            const values = [id];
            await client.query(sql, values);
            return { message: 'Locacion eliminada correctamente.' };
        } catch (error) {
            console.error("Error al eliminar la entidad:", error);
        } finally {
            await client.end();
        }
    }
}
