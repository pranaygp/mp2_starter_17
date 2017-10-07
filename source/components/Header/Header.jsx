import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Message } from 'semantic-ui-react'
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
      <div>
        <Header as='h2' icon textAlign='center'>
            <Icon name='search' circular />
            <Header.Content>
                Spotify Search
            </Header.Content>
        </Header>
        <ul className="nav">
          <li><NavLink isActive={this.isActive} to="/" >List</NavLink></li>
          <li><NavLink isActive={this.isActive} to="/gallery">Gallery</NavLink></li>
        </ul>
        <SearchBar />
        {this.props.connected ? null : <Message negative>
          <Message.Header>Not connected to Spotify</Message.Header>
          <p>Trying to connect</p>
        </Message>}
      </div>
    );
  }
}

MyHeader.propTypes = {
  connected: PropTypes.bool.isRequired
}

export default connect(state => ({connected: state.spotify.connected}))(MyHeader);