export type GetDevicesResponse = {
  dateCreate: string
  deviceId: string
  deviceName: string
  ip: string
  userId: string
}

export type GetAllDevicesResponse = GetDevicesResponse[]

export type DeleteDeviceRequest = {
  deviceId: string
}
export type RootDataItem = {
  browserName: string
  browserVersion: string
  deviceId: number
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}
