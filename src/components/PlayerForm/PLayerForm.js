import React from 'react';
import PropTypes from 'prop-types';

import './PlayerForm.scss';
import authData from '../../helpers/data/AuthData';

class PlayerForm extends React.Component {
  static propTypes = {
    saveNewPlayer: PropTypes.func.isRequired,
    putPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
  }

  state = {
    playerImageUrl: '',
    playerName: '',
    playerPosition: '',
    isEditing: false,
  }

  componentDidMount() {
    const { player } = this.props;
    if (player.name) {
      this.setState({
        playerImageUrl: player.imageUrl, playerName: player.name, playerPosition: player.position, isEditing: true,
      });
    }
  }

  savePlayer = (e) => {
    e.preventDefault();
    const { playerPosition, playerName, playerImageUrl } = this.state;
    const { saveNewPlayer } = this.props;
    const newPlayer = {
      imageUrl: playerImageUrl,
      name: playerName,
      position: playerPosition,
      uid: authData.getUid(),
    };
    saveNewPlayer(newPlayer);
  }

    nameChange = (e) => {
      e.preventDefault();
      this.setState({ playerName: e.target.value });
    }

    positionChange = (e) => {
      e.preventDefault();
      this.setState({ playerPosition: e.target.value });
    }

    imageUrlChange = (e) => {
      e.preventDefault();
      this.setState({ playerImageUrl: e.target.value });
    }

    updatePlayer = (e) => {
      e.preventDefault();
      const { player, putPlayer } = this.props;
      const { playerImageUrl, playerPosition, playerName } = this.state;
      const updatePlayer = {
        imageUrl: playerImageUrl,
        position: playerPosition,
        name: playerName,
        uid: authData.getUid(),
      };
      putPlayer(player.id, updatePlayer);
    }

    render() {
      const {
        playerName, playerImageUrl, playerPosition, isEditing,
      } = this.state;

      return (

          <div className="PlayerForm">
            <form className="col-6 offset-3">
            <div className="form-group">
          <label htmlFor="player-image-url">Player Image Url</label>
          <input
            type="text"
            className="form-control"
            id="player-image-url"
            placeholder="Enter Image Url"
            value={playerImageUrl}
            onChange={this.imageUrlChange}
          />
        </div>
              <div className="form-group">
                <label htmlFor="Player-name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="player-name"
                  placeholder="Jim"
                  value={playerName}
                  onChange={this.nameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="player-position">Position</label>
                <input
                  type="text"
                  className="form-control"
                  id="player-position"
                  placeholder="really nice description"
                  value={playerPosition}
                  onChange={this.positionChange}
                />
              </div>
              { isEditing
                ? <button className="btn btn-dark" onClick={this.updatePlayer}>Update Player</button>
                : <button className="btn btn-dark" onClick={this.savePlayer}>Save Player</button>
              }
            </form>
          </div>


      );
    }
}

export default PlayerForm;
