import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allPlayersObj = result.data;
      const players = [];
      if (allPlayersObj !== null) {
        Object.keys(allPlayersObj).forEach((playerId) => {
          const newPlayer = allPlayersObj[playerId];
          newPlayer.id = playerId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => reject(err));
});

const deletePlayer = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

const savePlayer = (newPlayer) => axios.post(`${baseUrl}/players.json`, newPlayer);

const updatePlayer = (playerId, updatedPlayer) => axios.put(`${baseUrl}/players/${playerId}.json`, updatedPlayer);


export default {
  getPlayersByUid,
  deletePlayer,
  savePlayer,
  updatePlayer,
};
