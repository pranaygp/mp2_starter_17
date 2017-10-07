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
    axios(`http://pokeapi.co/api/v2/`, {
      params: {
        q: query
      }
    })
      .then(console.log)
  }

  render() {
    return (
      <div>
        <Input loading={this.props.loading} placeholder='Search...'  onChange={this.onChange.bind(this)}/>        
      </div>
    );
  }
}

SearchBar.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default connect(state => ({loading: state.search.isLoading}))(SearchBar);