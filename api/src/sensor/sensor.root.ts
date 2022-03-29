import {CreateSensor, Sensor, UpdateSensor} from "./sensor.model";
import {createSensor, findAll, updateSensorName} from "./sensor.service";

export class SensorRoot {
    patch =  async  (id: null, data: UpdateSensor): Promise<{message: string}> => {
        const message = await  updateSensorName(data)
        return {"message": message}
    }

    create = async (data: CreateSensor): Promise<{message: string}> => {
        const message = await  createSensor(data)
        return {"message": message}
    }

    find = async (): Promise<Sensor[]> => {
        return await findAll();
    }
}