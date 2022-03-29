import {SensorRepository} from "./sensor.repository";
import {CreateSensor, Sensor, UpdateSensor} from "./sensor.model";

const sensorRepository = new SensorRepository();

export const updateSensorName = async (updateInfos: UpdateSensor) => {
    await sensorRepository.updateNameRooter(updateInfos);
    return "Sensor ("+updateInfos.macAddress+") name is update";
}

export const createSensor= async (createRooter: CreateSensor) => {
    await sensorRepository.saveNewSensor({...createRooter})
    return "Sensor ("+createRooter.macAddress+") is create";
}

export const findAll = async ():Promise<Sensor[]> => await sensorRepository.findAll();