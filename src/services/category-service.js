import CategoryRespository from '../repositories/category-repository';


const repo = new CategoryService();

export default class CategoryService {
    getAllAsync = async () => {
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const returnObject = await repo.getByIdAsync(id);
        return returnObject;
    }

    createAsync = async (province) => {
        const createdEntity = await repo.createAsync(category);
        return createdEntity;
    }

    updateAsync = async (province) => {
        const updatedEntity = await repo.updateAsync(category);
        return updatedEntity;
    }

    deleteByIdAsync = async (id) => {
        const success = await repo.deleteByIdAsync(id);
        return success;
    }
}
