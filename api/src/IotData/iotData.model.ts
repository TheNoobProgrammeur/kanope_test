export type DataDecoding = {
    tempOne: number;
    tempTwo: number;
    humidity: number;
    airPressure: number;
}

export type Device = {
    rssi: number;
    data: string | DataDecoding;
}

export type IotData =  {
    time?: Date;
    imei: string;
    devices: Map<string, Device>;
}
