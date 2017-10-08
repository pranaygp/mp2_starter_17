import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { Image, Card, Menu } from 'semantic-ui-react'

import Header from '../Header/Header.jsx';

import { filter } from '../../redux/actions';

import styles from './Gallery.scss'

class Gallery extends Component {

  filterSongs(songs) {
    return songs.filter(song => {
      if(this.props.filters.singleArtist && song.artists.length > 1) {
        return false;
      }
      if(this.props.filters.noExplicit && song.explicit) {
        return false;
      }
      return true;
    })
  }

  handleItemClick(e, { name }) {
    this.props.dispatch(filter(name))
  }

  renderSongs(songs = []) {
    return this.filterSongs(songs).map((song, i) => (
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
            <Menu text>
              <Menu.Item header>Filter </Menu.Item>
              <Menu.Item name='singleArtist' active={this.props.filters.singleArtist} onClick={this.handleItemClick.bind(this)}>
                No Collaborations
              </Menu.Item>
              <Menu.Item name='noExplicit' active={this.props.filters.noExplicit} onClick={this.handleItemClick.bind(this)}>
                No Explicit Songs
              </Menu.Item>
            </Menu>
            <Card.Group className="galleryContainer" itemsPerRow={3}>
                {this.renderSongs(this.props.songs)}
            </Card.Group>
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
      ).isRequired,
      duration_ms: PropTypes.number,
      explicit: PropTypes.bool.isRequired,
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
  filters: PropTypes.shape({
    singleArtist: PropTypes.bool.isRequired,
    noExplicit: PropTypes.bool.isRequired,
  })
}

export default withRouter(connect(state => ({
  songs: state.data.results,
  filters: state.filters
}))(Gallery));