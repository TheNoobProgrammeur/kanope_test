export type Trace = {
    time: Date;
    rssi: number
}

export type SensorHistoryTrace = {
    macAddress: string;
    sensorHistoryTrace: Trace[];
}

export type Rooter = {
    name?: string;
    imei: string;
    sensorTable?: SensorHistoryTrace[]
}

export type UpdateRooter = {
    imei: string;
    newName: string;
}

export type CreateRooter = {
    imei: string;
    name?: string;
}
