import React from 'react';
import PropTypes from 'prop-types';

import './TeamContainer.scss';

import playersData from '../../helpers/data/playersData';
import authData from '../../helpers/data/AuthData';

import Player from '../Player/Player';


class TeamContainer extends React.Component {
  state = {
    players: [],
  }

  getAllPlayers = () => {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('cant get players: ', err));
  }

  componentDidMount() {
    this.getAllPlayers();
  }

  removePlayer = (playerId) => {
    console.log('player', playerId);
    playersData.deletePlayer(playerId).then(() => this.getAllPlayers())
      .catch((err) => console.error('unable to delete board', err));
  }

  render() {
    const { players } = this.state;
    const makePlayers = players.map((player) => <Player key={player.id} player={player} removePlayer={this.removePlayer}/>);
    return (
      <div className="TeamContainer">
        <h1 className="teamName text-white mt-3 mb-3">The 2020 Line Up</h1>
        <div className="d-flex flex-wrap">
          {makePlayers}
        </div>
      </div>
    );
  }
}

export default TeamContainer;