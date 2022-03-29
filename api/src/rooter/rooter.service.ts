import {RooterRepository} from "./rooter.repository";
import {CreateRooter, Rooter, UpdateRooter} from "./rooter.model";

const rooterRepository = new RooterRepository();

export const updateRooterName = async (updateInfos: UpdateRooter): Promise<string> => {
    await rooterRepository.updateNameRooter(updateInfos);
    return "Rooter "+updateInfos.imei+" name is update";
}

export const createRooter = async (createRooter: CreateRooter): Promise<string> => {
    await rooterRepository.saveNewRooter({...createRooter})
    return "Rooter "+createRooter.imei+" is create";
}

export const findAll = async ():  Promise<Rooter[]>  => {
    return rooterRepository.findAll();
}

