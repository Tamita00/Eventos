import DBConfig from '../configs/db-config.js';
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class UserRepository {
    // Método para obtener todas las provincias de forma asíncrona
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users';
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
            const sql = 'SELECT * FROM users WHERE ID = $1';
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
            const {first_name, last_name, username, password } = entity; // Suponiendo que 'entity' tiene un formato específico con 'name' y 'description'
            const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [first_name, last_name, username, password];
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
            const { id, first_name, last_name, username, password } = entity; // Suponiendo que 'entity' tiene un formato específico con 'id', 'name' y 'description'
            const sql = 'UPDATE users SET first_name = $2, last_name = $3, username = $4, password = $5 WHERE id = $1 RETURNING *';
            const values = [ id, first_name, last_name, username, password ];
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
            const sql = 'DELETE FROM users WHERE id = $1';
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
