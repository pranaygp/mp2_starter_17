import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router';
import { Card, Button, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import MyHeader from '../Header/Header.jsx';

import styles from './Song.scss'

class Song extends Component {

  renderControls() {
    const songID = this.props.match.params.id;
    const song = this.props.songs.find(song => song.id === songID);
    const thisPage = this.props.songs.indexOf(song);
    const hasPrevPage = thisPage > 0;
    const hasNextPage = thisPage < (this.props.songs.length - 1);

    let prevPage = null;
    let nextPage = null;

    if (hasPrevPage) {
      prevPage = this.props.songs[thisPage-1].id;
    }

    if (hasNextPage) {
      nextPage = this.props.songs[thisPage+1].id;
    }

    return (
      <div className="controls">
        <Button content='Prev' disabled={!hasPrevPage} icon='left arrow' labelPosition='left' onClick={(e) => { this.props.history.push(`/song/${prevPage}`) }} />
        <Button content='Next' disabled={!hasNextPage} icon='right arrow' labelPosition='right' onClick={(e) => { this.props.history.push(`/song/${nextPage}`) }} />
      </div>
    )
  }

  render() {
    const songID = this.props.match.params.id;
    const song = this.props.songs.find(song => song.id === songID);

    if(!song) {
      // missing data
      return <Redirect to='/' />
    }

    const minLength = Math.floor(song.duration_ms / (60 * 1000));
    const secLength = Math.floor((song.duration_ms % (60 * 1000))/1000);

    return(
      <div className="Song">
        <MyHeader search={false}/>
        {this.renderControls()}
        <Header>
          <Header.Content>
            {song.name}
          </Header.Content>
        </Header>
        <Image width={300} src={song.album.images[0].url} />
        <audio width={300} autoPlay={false} src={song.preview_url} controls />
        <h4>Artists: {song.artists.map(a => a.name).join(', ')}</h4>
        <h4>Album: {song.album.name}</h4>
        <p>Length: {minLength}m{secLength}s</p>
        <p>Spotify: <a href={song.external_urls.spotify}>{song.external_urls.spotify}</a></p>
      </div>
    )
  }
}

Song.propTypes = {
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
  )
}

export default withRouter(connect(state => ({
  songs: state.data.results
}))(Song))
