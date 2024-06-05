import EventosRepository from "../repositories/evento-repository.js";


export default class EventosService {
    constructor() {
        this.eventosRepository = new EventosRepository();
    }

    async getAllAsync() {
        return await this.eventosRepository.getAllAsync();
    }

    async getByIdAsync(id) {
        return await this.eventosRepository.getByIdAsync(id);
    }

    async createAsync(evento) {
        return await this.eventosRepository.createAsync(evento);
    }

    async updateAsync(evento) {
        return await this.eventosRepository.updateAsync(evento);
    }

    async deleteByIdAsync(id) {
        return await this.eventosRepository.deleteByIdAsync(id);
    }

    async getByCategoriaAsync(category) {
        return await this.eventosRepository.getByCategoriaAsync(category);
    }

    async getByNombreAsync(name) {
        return await this.eventosRepository.getByNombreAsync(name);
    }
    
    async getByFechaInicioAsync(startdate) {
        return await this.eventosRepository.getByFechaInicioAsync(startdate);
    }
    
    async getByTagAsync(tag) {
        return await this.eventosRepository.getByTagAsync(tag);
    }


    //LISTADO DE PARTICIPANTES

    async getByEventUserName(id, name) {
        return await this.eventosRepository.getByEventUserName(id, name);
    }

    async getByEventUserLastName(id, username) {
        return await this.eventosRepository.getByEventUserLastName(id, username);
    }

    async getByEventUserUsername(id, username) {
        return await this.eventosRepository.getByEventUserUsername(id, username);
    }
    
    async getByEventUserAttended(id, username) {
        return await this.eventosRepository.getByEventUserAttended(id, username);
    }

    async getByEventUserRating(id, rating) {
        return await this.eventosRepository.getByEventUserRating(id, rating);
    }


}