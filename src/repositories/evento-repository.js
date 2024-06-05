import DBConfig from '../configs/db-config.js';
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class EventosRepository {
    // Método para obtener todas las events de forma asíncrona
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    
    // Método para buscar un evento por categoría
    getByCategoriaAsync = async (category) => {
        const client = new Client(DBConfig);
        let eventos = null;
        try {
            await client.connect();
            const sql = 'SELECT * FROM events INNER JOIN event_categories ON event_categories.id = events.id_event_category WHERE event_categories.name = $1;';
            const values = [category];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos; 
    }

 
    // Método para buscar un evento por nombre
    getByCategoriaAsync = async (name) => {
        const client = new Client(DBConfig);
        let eventos = null;
        try {
            await client.connect();
            const sql = 'SELECT * FROM events WHERE $1 = name;';
            const values = [category];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos; 
    }
 
    // Método para buscar un evento por fecha inicio
    getByFechaInicioAsync = async (startdate) => {
        const client = new Client(DBConfig);
        let eventos = null;
        try {
            await client.connect();
            const sql = 'SELECT * FROM events WHERE start_date = $1;';
            const values = [startdate];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos; 
    }

    // Método para buscar un evento por tag (descripcion)
    getByTagAsync = async (tag) => {
        const client = new Client(DBConfig);
        let eventos = null;
        try {
            await client.connect();
            const sql = 'SELECT * FROM events WHERE description= $1;';
            const values = [tag];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos; 
    }


    // Método para obtener una events por su ID de forma asíncrona
    getByIdAsync = async (id) => {
        let eventos = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM events WHERE ID = $1';
            const values = [51];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos;

    }

    //obtener participantes del evento por nombre
    getByEventUserLastName = async (id, name) => {
        let eventos = null;
        const client = new Client(DBConfig);
        
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN events ON events.id = users.event_id WHERE events.id = $1 AND users.first_name = $2;';         
            const values = [id, name];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos;

    }
    
    //obtener participantes del evento por username
    getByEventUserUsername = async (id, username) => {
        let eventos = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN events ON events.id = users.event_id WHERE events.id = $1 AND users.username = $2;';         
            const values = [id, username];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos;

    }

    //obtener participantes del evento por attended
    getByEventUserAttended = async (id, username) => {
        let eventos = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user WHERE event_enrollments.id_event = $1 AND users.username = $2 AND event_enrollments.attended = True ;';         
            const values = [id, username];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos;

    }

    //obtener participantes del evento por rating
    getByEventUserRating = async (id, rating) => {
        let eventos = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN events ON events.id = users.event_id INNER JOIN event_enrollments ON users.id = event_enrollments.id_user WHERE events.id = $1 AND event_enrollments.rating = $2;';         
            const values = [id, rating];
            const result = await client.query(sql, values);
            await client.end();
            eventos = result.rows;
        } catch (error) {
            console.log(error);
        }

        return eventos;

    }

    // Método para crear una nueva events de forma asíncrona
    createAsync = async (entity) => {
        let CrearEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { name, description } = entity; // Suponiendo que 'entity' tiene un formato específico con 'name' y 'description'
            const sql = 'INSERT INTO provinces (name, description) VALUES ($1, $2) RETURNING *';
            const values = [name, description];
            const result = await client.query(sql, values);
            createdEntity = result.rows[0]; // Suponiendo que el resultado devuelve la entidad creada
        } catch (error) {
            console.error("Error al crear la entidad:", error);
        } finally {
            await client.end();
        }
        return CrearEntity;
    }

    // Método para actualizar una events existente de forma asíncrona
    updateAsync = async (entity) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { id, name, description } = entity; // Suponiendo que 'entity' tiene un formato específico con 'id', 'name' y 'description'
            const sql = 'UPDATE provinces SET name = $2, description = $3 WHERE id = $1 RETURNING *';
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

    // Método para eliminar un event por su ID de forma asíncrona
    deleteByIdAsync = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM events WHERE id = $1';
            const values = [id];
            await client.query(sql, values);
            return { message: 'Provincia eliminada correctamente.' };
        } catch (error) {
            console.error("Error al eliminar la entidad:", error);
        } finally {
            await client.end();
        }
    }

   //EVENT_ENROLLMENT: Método para verificar si un usuario está registrado en un evento
    isUserEnrolled = async (eventId, userId) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT COUNT(*) FROM event_enrollment WHERE event_id = $1 AND user_id = $2';
            const values = [eventId, userId];
            const result = await client.query(sql, values);
            const count = parseInt(result.rows[0].count);
            return count > 0;
        } catch (error) {
            console.error('Error al verificar la inscripción del usuario en el evento:', error);
            throw error;
        } finally {
            await client.end();
        }
    }
}
