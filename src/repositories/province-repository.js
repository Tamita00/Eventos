import DBConfig from '../configs/db-config.js';
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class ProvinceRepository {
    // Método para obtener todas las provincias de forma asíncrona
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM provinces';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // Método para obtener una provincia por su ID de forma asíncrona
    getByIdAsync = async (id) => {
        let provinces = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM provinces WHERE ID = $1';
            const values = [51];
            const result = await client.query(sql, values);
            await client.end();
            provinces = result.rows;
        } catch (error) {
            console.log(error);
        }

        return provinces;

    }

    // Método para crear una nueva provincia de forma asíncrona
    createAsync = async (entity) => {
        let CrearEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { id, name, full_name, latitude, longitude, display_order } = entity; // Suponiendo que 'entity' tiene un formato específico con 'name' y 'description'
            const sql = 'INSERT INTO provinces (id, name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const values = [id, name, full_name, latitude, longitude, display_order];
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
            const { id, name, full_name, latitude, longitude, display_order } = entity; // Suponiendo que 'entity' tiene un formato específico con 'id', 'name' y 'description'
            const sql = 'UPDATE provinces SET name = $2, latitude = $3 , longitude = $4, display_order= $5 WHERE id = $1 RETURNING *';
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

    // Método para eliminar una provincia por su ID de forma asíncrona
    deleteByIdAsync = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM provinces WHERE id = $1';
            const values = [id];
            await client.query(sql, values);
            return { message: 'Provincia eliminada correctamente.' };
        } catch (error) {
            console.error("Error al eliminar la entidad:", error);
        } finally {
            await client.end();
        }
    }
}
