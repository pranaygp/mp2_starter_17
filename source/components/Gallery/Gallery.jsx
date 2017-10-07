import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { Image, Card } from 'semantic-ui-react'

import Header from '../Header/Header.jsx';

import styles from './Gallery.scss'

class Gallery extends Component {

  renderSongs(songs = []) {
    return songs.map((song, i) => (
        <Card key={song.id} onClick={(e) => { this.props.history.push(`/song/${i}`) }}>
            <Image src={song.album.images[0].url} />
            <Card.Content>
            <Card.Header>
                {song.name}
            </Card.Header>
            <Card.Meta>
                <span>
                {song.artists.map(a => a.name).join(', ')}
                </span>
                <br />
                <span>
                {song.album.name}
                </span>
            </Card.Meta>
            </Card.Content>
        </Card>
    ))
  }

  render() {
    return (
        <div className='Gallery'>
            <Header/>
            {/* <List relaxed='very' animated selection verticalAlign='middle'> */}
            <Card.Group className="galleryContainer" itemsPerRow={3}>
                {this.renderSongs(this.props.songs)}
            </Card.Group>
            {/* </List> */}
        </div>
    );
  }
}

Gallery.propTypes = {
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
      external_urls: PropTypes.arrayOf(
        PropTypes.shape({
          spotify: PropTypes.string
        })
      ),
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
}))(Gallery));