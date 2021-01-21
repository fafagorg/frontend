import * as requestService from "./request";

export const getRooms = async () => {
  let request = await requestService.request('GET', `${process.env.REACT_APP_ENDPOINT_API_MESSENGER}/v1/messenger/room`, {}, {}, true);
  return request.data
};

export const getMessages = async (roomId) => {
  let request = await requestService.request('GET', `${process.env.REACT_APP_ENDPOINT_API_MESSENGER}/v1/messenger/room/${roomId}`, {}, {}, true);
  return request.data
};

export const removeRoom = async (roomId) => {
  let request = await requestService.request('DELETE', `${process.env.REACT_APP_ENDPOINT_API_MESSENGER}/v1/messenger/room/${roomId}`, {}, {}, true);
  return request.data
};

export const modifyRoomName = async (roomId, data) => {
  let request = await requestService.request('PUT', `${process.env.REACT_APP_ENDPOINT_API_MESSENGER}/v1/messenger/room/${roomId}`, data, {}, true);
  return request.data
};

export const getUserInfo = async (userId) => {
  let request = await requestService.request('GET', `${process.env.REACT_APP_ENDPOINT_API_AUTH}/api/v1/users/string`, {}, {}, true);
  return {
    userId: request.data.username,
    userName: request.data.name,
    image: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
  }
};
