import {DataDecoding, IotData} from "./iotData.model";
import {IotDataRepository} from "./iotData.repository";
import {SensorRepository} from "../sensor/sensor.repository";
import {RooterRepository} from "../rooter/rooter.repository";

const iotDataRepository = new IotDataRepository();
const sensorRepository = new SensorRepository();
const rooterRepository = new RooterRepository();

export const callbackProcessing = async (data: IotData) => {
    await iotDataRepository.save(data);
    decode(data);
    if(await rooterRepository.checkRooterByImei(data.imei) === 0){
       await rooterRepository.saveNewRooter({imei: data.imei})
    }
    for(const [macAddress, device]  of Object.entries(data.devices) ){
        addDataOnSensor(macAddress, device.data)
            .then(() => console.debug("Data decoding insert in sensor"))
        addRooterTrace(data.imei, macAddress, device.rssi)
            .then(() => console.debug("Sensor trace save"))
    }
}

const addDataOnSensor = async (macAddress: string, data: DataDecoding) => {
    if(await sensorRepository.checkSensorByMacAddress(macAddress) === 0){
        await sensorRepository.saveNewSensor({
            macAddress: macAddress,
            dataStatements: [{
                data: data
            }]})
            .then(() => console.debug("sensor create"))
    } else {
        await sensorRepository.addDataOnSensor(macAddress, data)
            .then(() => console.debug("data save"))
    }

}

const addRooterTrace = async (imei: string, macAddress: string, rssi: number) => {
    if(await rooterRepository.checkSensorInSensorTable(imei, macAddress) === 0){
        await rooterRepository.addSensorInSensorTable(imei, macAddress, rssi)
    } else {
        await rooterRepository.addSensorTrace(imei, macAddress, rssi)
    }
}

export const findAll =  async () => {
    return await iotDataRepository.findAll();
}

const decodeData = (data: string ): DataDecoding => {

    let message: string = data.substring(38);
    const tempOne = swapAndParse(message.substring(0, 4))/100;
    const tempTwo = swapAndParse(message.substring(4, 8))/100;
    const humidity = swapAndParse(message.substring(8, 12))/100;
    const airPressure = swapAndParse( message.substring(12));

    return {
        tempOne,
        tempTwo,
        humidity,
        airPressure
    }
}

const swapAndParse = (data: string): number => {
    return parseInt(data.substring(2) + data.substring(0,2), 16);
}

const decode = (iotData: IotData): IotData => {
    for(const [key, value] of Object.entries(iotData.devices)){
        // @ts-ignore
        iotData.devices[key].data = decodeData(value.data);
    }
    return iotData;
}