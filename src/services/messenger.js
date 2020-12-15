import * as requestService from "./request";

export const getRooms = async () => {
  // requestService.request('GET', `{process.env.REACT_APP_ENDPOINT_API_MESSENGER}/messenger/room`, {}, {}, true);
  return [
      {
        roomId: "1-2-3",
        lastMessage: "Hola, que tal?",
        user: {
            userId: 1,
            image: "https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png"
        }
      },
      {
        roomId: "1-2-4",
        lastMessage: "Hola, que tal?",
        user: {
            userId: 1,
            image: "https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png"
        }
      }
  ]
}

export const getMessages = async (roomId) => {
    return {
        roomId: "1-2-3",
        user: {
            userId: 1,
            name: "Jesús Monda",
            image: "https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png"
        },
        messages: [
            {
                content: "hola que tal 1",
                userId: 1,
                image: "https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png"
            },
            {
                content: "hola que tal 2",
                userId: 1,
                image: "https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png"
            }
        ]
    }
}