import DBConfig from '../configs/db-config.js';
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class CategoryRespository {
    // Método para obtener todas las categorías de forma asíncrona
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_categories';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    // Método para obtener una categoria por su ID de forma asíncrona
    getByIdAsync = async (id) => {
        let categorias = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM event_categories WHERE ID = $1';
            const values = [51];
            const result = await client.query(sql, values);
            await client.end();
            categorias = result.rows;
        } catch (error) {
            console.log(error);
        }

        return categorias;

    }

    // Método para crear una nueva categoria de forma asíncrona
    createAsync = async (entity) => {
        let CrearEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { name, display_order } = entity; // Suponiendo que 'entity' tiene un formato específico con 'name' y 'description'
            const sql = 'INSERT INTO event_categories (name, display_order) VALUES ($1, $2) RETURNING *';
            const values = [name, display_order];
            const result = await client.query(sql, values);
            createdEntity = result.rows[0]; // Suponiendo que el resultado devuelve la entidad creada
        } catch (error) {
            console.error("Error al crear la entidad:", error);
        } finally {
            await client.end();
        }
        return CrearEntity;
    }

    // Método para actualizar una categoria existente de forma asíncrona
    updateAsync = async (entity) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { id, name, display_order } = entity; // Suponiendo que 'entity' tiene un formato específico con 'id', 'name' y 'description'
            const sql = 'UPDATE event_categories SET name = $2, display_order = $3 WHERE id = $1 RETURNING *';
            const values = [id, name, display_order];
            const result = await client.query(sql, values);
            const updatedEntity = result.rows[0]; // Suponiendo que el resultado devuelve la entidad actualizada
            return updatedEntity;
        } catch (error) {
            console.error("Error al actualizar la entidad:", error);
        } finally {
            await client.end();
        }
    }

    // Método para eliminar una categoria por su ID de forma asíncrona
    deleteByIdAsync = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_categories WHERE id = $1';
            const values = [id];
            await client.query(sql, values);
            return { message: 'Categoria eliminada correctamente.' };
        } catch (error) {
            console.error("Error al eliminar la entidad:", error);
        } finally {
            await client.end();
        }
    }
}
