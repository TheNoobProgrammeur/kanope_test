import {api} from "boot/axios";

export const serviceApi = {
  login: (email, password) => api.post('/auth', {email, password})
    .then(response => {
      api.defaults.headers['Authorization'] = response.data.tokenType + " " +response.data.token
      return {message: response.data.message, status: true}
    }).catch((err) => {
      return {
        message: "Error in login",
        status: false
      }
    }),
  getSensor: () => api.get('/sensor'),
  updateSensorName: (newName, macAddress) => api.patch('/sensor', {
    macAddress,
    newName
  })
    .then(response => {
      return {
        message: response.data.message,
        status: true
      }
    }).catch(err => {
      console.error(err);
      return {
        message: "Error in sensor update name",
        status: false
    }}),
  createSensor: (name, macAddress) => api.post('/sensor', {
    macAddress,
    name
  }).then(response => {
    return {
      message: response.data.message,
      status: true
    }
  }).catch(err => {
    console.error(err);
    return {
      message: "Error in sensor creation",
      status: false
    }}),
  getUser: () => api.get("/user"),
  createUser: (userName, email, password) => api.post('/user', {
    userName,
    email,
    password
  }).then(response => {
    return {
      message: response.data.message,
      status: true
    }
  }).catch(err => {
    console.error(err);
    return {
      message: "Error in user creation",
      status: false
    }}),
  getRooter: () => api.get("/rooter"),
  updateRooterName: (newName, imei) => api.patch('/rooter', {
    imei,
  newName
})
  .then(response => {
    return {
      message: response.data.message,
      status: true
    }
  }).catch(err => {
    console.error(err);
    return {
      message: "Error in sensor update name",
      status: false
    }}),
}
