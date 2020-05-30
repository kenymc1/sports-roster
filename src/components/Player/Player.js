import React from 'react';
import PropTypes from 'prop-types';
import './Player.scss';
import playerShape from '../../helpers/propz/playerShape';

class Player extends React.Component {
  static propTypes = {
    Player: playerShape.playerShape,
    removePlayer: PropTypes.func.isRequired,
    editPlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, removePlayer } = this.props;
    removePlayer(player.id);
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { editPlayer, player } = this.props;
    editPlayer(player);
  }

  render() {
    const { player } = this.props;
    return (
      <div className="Player col-md-4">
      <div className="card playerCard mb-3 mx-auto">
       <img className="card-img-top" src={player.imageUrl} alt="player pic"/>
        <div className="card-body">
          <h5 className="card-title">{player.name}</h5>
          <p className="card-text">Position: {player.position}</p>
          <button className="btn btn-danger" onClick={this.deletePlayerEvent}><i className="fas fa-times-circle"></i></button>
          <button className="btn btn-warning" onClick={this.editPlayerEvent}><i className="fas fa-pencil-alt"></i></button>
        </div>
       </div>
    </div>

    );
  }
}

export default Player;
