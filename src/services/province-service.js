import ProvinceRepository from "../repositories/province-repository.js";

export default class ProvinceService {
    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnObject = await repo.getByIdAsync(id);
        return returnObject;
    }

    createAsync = async (province) => {
        const repo = new ProvinceRepository();
        const createdEntity = await repo.createAsync(province);
        return createdEntity;
    }

    updateAsync = async (province) => {
        const repo = new ProvinceRepository();
        const updatedEntity = await repo.updateAsync(province);
        return updatedEntity;
    }

    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const success = await repo.deleteByIdAsync(id);
        return success;
    }
}
