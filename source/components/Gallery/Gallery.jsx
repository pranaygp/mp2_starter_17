import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { Image, Card, Menu, Dimmer, Loader } from 'semantic-ui-react'
import Waypoint from 'react-waypoint';
import axios from 'axios';

import Header from '../Header/Header.jsx';

import { filter, source, search, append_results } from '../../redux/actions';

import styles from './Gallery.scss'

class Gallery extends Component {

  handleWaypointEnter() {
    console.log('Fetching more items');
    if(this.props.connected && !this.props.loading && this.props.query !== "") {
      this.props.dispatch(search(this.props.query))
      axios(`https://api.spotify.com/v1/search`, {
        headers: {
          'authorization': `Bearer ${this.props.token}`
        },
        params: {
          q: this.props.query,
          type: 'track',
          offset: this.props.songs.length
        }
      }).then(({data}) => {
        this.props.dispatch(append_results(data.tracks.items))
      })
    }
  }

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

  componentDidMount() {
    this.props.dispatch(source('GALLERY'))
  }

  renderSongs(songs = []) {
    return this.filterSongs(songs).map((song, i) => (
        <Card key={song.id} onClick={(e) => { this.props.history.push(`/song/${song.id}`) }}>
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
                <Waypoint
                  onEnter={this.handleWaypointEnter.bind(this)}
                />
                { this.filterSongs(this.props.songs).length > 0 ? <Card>
                  <Dimmer active>
                    <Loader>Loading</Loader>
                  </Dimmer>
                </Card> : null }
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
  }),
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  token: PropTypes.string,
}

export default withRouter(connect(state => ({
  songs: state.data.results,
  filters: state.filters,
  loading: state.search.isLoading,
  query: state.search.query,
  connected: state.spotify.connected,
  token: state.spotify.access_token
}))(Gallery));