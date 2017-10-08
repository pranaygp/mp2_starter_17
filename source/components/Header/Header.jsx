import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Image, Message } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux';

import styles from './Header.scss'

import SearchBar from '../SearchBar/SearchBar.jsx'

class MyHeader extends Component {

  isActive(match, location) {
    if (!match) return false;

    return match.path === location.pathname;
  }

  render() {
    return (
      <div className='Header'>
        <Image width={400} src='./assets/spotify.svg' />
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Song Search
          </Header.Content>
        </Header>
        <ul className="nav">
          <li><NavLink isActive={this.isActive} to="/" >List</NavLink></li>
          <li><NavLink isActive={this.isActive} to="/gallery">Gallery</NavLink></li>
        </ul>
        {this.props.search !== false ? <SearchBar /> : null }
        {this.props.connected ? null : <Message negative>
          <Message.Header>Not connected to Spotify</Message.Header>
          <p>Trying to connect</p>
        </Message>}
      </div>
    );
  }
}

MyHeader.propTypes = {
  connected: PropTypes.bool.isRequired,
  search: PropTypes.bool
}

export default connect(state => ({connected: state.spotify.connected}))(MyHeader);