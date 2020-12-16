import * as requestService from "./request";

export const getRooms = async () => {
  let request = await requestService.request('GET', `${process.env.REACT_APP_ENDPOINT_API_MESSENGER}/messenger/room`, {}, {}, true);
  return request.data
};

export const getMessages = async (roomId) => {
  let request = await requestService.request('GET', `${process.env.REACT_APP_ENDPOINT_API_MESSENGER}/messenger/room/${roomId}`, {}, {}, true);
  return request.data
};
