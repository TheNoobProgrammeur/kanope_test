import {CreateRooter, Rooter, UpdateRooter} from "./rooter.model";
import {createRooter, findAll, updateRooterName} from "./rooter.service";

export class RooterRoot {

    patch = async (id: null, data: UpdateRooter): Promise<{message: string}> => {
        const message = await updateRooterName(data);
        return {"message": message}
    }

    create = async (data: CreateRooter): Promise<{message: string}> => {
        const message = await createRooter(data);
        return {"message": message}
    }

    find = async (): Promise<Rooter[]> => {
        return findAll();
    }
}