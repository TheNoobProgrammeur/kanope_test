export type Sensor = {
    name?: string;
    macAddress: string;
    dataStatements?: DataStatement[]
}

export type DataStatement = {
    date?: Date;
    data: DataDecoding;
}


export type DataDecoding = {
    tempOne: number;
    tempTwo: number;
    humidity: number;
    airPressure: number;
}

export type UpdateSensor = {
    macAddress: string;
    newName: string;
}

export type CreateSensor = {
    macAddress: string;
    name?: string;
}