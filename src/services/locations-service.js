import LocationRepository from "../repositories/locations-repository";

export default class LocationService {
    getAllAsync = async () => {
        const repo = new LocationRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new LocationRepository();
        const returnObject = await repo.getByIdAsync(id);
        return returnObject;
    }

    createAsync = async (province) => {
        const repo = new LocationRepository();
        const createdEntity = await repo.createAsync(location);
        return createdEntity;
    }

    updateAsync = async (province) => {
        const repo = new LocationRepository();
        const updatedEntity = await repo.updateAsync(location);
        return updatedEntity;
    }

    deleteByIdAsync = async (id) => {
        const repo = new LocationRepository();
        const success = await repo.deleteByIdAsync(id);
        return success;
    }
}
