import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Header, Icon, Input } from 'semantic-ui-react'
import {search, results} from '../../redux/actions.js'
import {connect} from 'react-redux';

class SearchBar extends Component {
  onChange (e) {
    this.dispatchSearch(e.target.value);
    this.sideEffectSearch(e.target.value);
  }

  dispatchSearch (query) {
    this.props.dispatch(search(query))
  }

  sideEffectSearch (query) {
    if(this.props.connected) {
      axios(`https://api.spotify.com/v1/search`, {
        headers: {
          'authorization': `Bearer ${this.props.token}`
        },
        params: {
          q: query,
          type: 'track'
        }
      }).then(({data}) => {
        this.props.dispatch(results(data.tracks.items))
      })
    }
  }

  render() {
    return (
      <div>
        <Input value={this.props.query} loading={this.props.loading} placeholder='Search...'  onChange={this.onChange.bind(this)}/>        
      </div>
    );
  }
}

SearchBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  token: PropTypes.string,
}

export default connect(state => ({
  loading: state.search.isLoading,
  query: state.search.query,
  connected: state.spotify.connected,
  token: state.spotify.access_token
}))(SearchBar);