import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { Image, List } from 'semantic-ui-react'

class SongList extends Component {

  sortSongs(songs) {
    return songs.sort((a, b) => {
      if(this.props.sort.name === 'ASC') {
        return a.name.localeCompare(b.name);
      }
      if(this.props.sort.name === 'DESC') {
        return b.name.localeCompare(a.name);
      }

      if(this.props.sort.artist === 'ASC') {
        return a.artists[0].name.localeCompare(b.artists[0].name);
      }
      if(this.props.sort.artist === 'DESC') {
        return b.artists[0].name.localeCompare(a.artists[0].name);
      }

      if(this.props.sort.popularity === 'ASC') {
        return b.popularity - a.popularity;
      }
      if(this.props.sort.popularity === 'DESC') {
        return a.popularity - b.popularity;
      }

      return 0;
    })
  }
        
  renderSongs(songs = []) {
    return this.sortSongs(songs).map((song, i) => (
      <List.Item key={song.id} onClick={(e) => { this.props.history.push(`/song/${i}`) }}>
        <Image width={100} height={100} src={song.album.images[0].url} />
        <List.Content>
          <List.Header>{song.name}</List.Header>
          <List.Description>{song.artists.map(a => a.name).join(', ')}</List.Description>
          <List.Description>{song.album.name}</List.Description>
        </List.Content>
      </List.Item>
    ))
  }

  render() {
    return (
      <List relaxed='very' animated selection verticalAlign='middle'>
        {this.renderSongs(this.props.songs)}
      </List>
    );
  }
}

SongList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      album: PropTypes.shape({
        artists: PropTypes.array,
        href: PropTypes.string,
        id: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            height: PropTypes.number,
            url: PropTypes.string,
            width: PropTypes.number
          })
        ),
        name: PropTypes.string.isRequired,
      }),
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string.isRequired,
          uri: PropTypes.string,
        })
      ),
      duration_ms: PropTypes.number,
      explicit: PropTypes.bool,
      external_urls: PropTypes.shape({
        spotify: PropTypes.string
      }),
      href: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      popularity: PropTypes.number,
      preview_url: PropTypes.string,
      uri: PropTypes.string
    })
  ),
  sort: PropTypes.shape({
    name: PropTypes.string,
    artist: PropTypes.string,
  })
}

export default withRouter(connect(state => ({
  songs: state.data.results,
  sort: state.sort
}))(SongList));