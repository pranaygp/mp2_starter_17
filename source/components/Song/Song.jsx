import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Header/Header.jsx';

import styles from './Song.scss'

class Song extends Component {

  renderControls() {
    const thisPage = Number(this.props.match.params.id);
    const hasPrevPage = thisPage > 0;
    const hasNextPage = thisPage < (this.props.songs.length - 1);
    console.log(thisPage, hasPrevPage, hasNextPage)
    return null
  }

  render() {
    return(
      <div className="Song">
        <Header search={false}/>
        {this.renderControls()}
        <h3>ID: {this.props.match.params.id}</h3>
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
      href: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      popularity: PropTypes.number,
      preview_url: PropTypes.string,
      uri: PropTypes.string
    })
  )
}

export default connect(state => ({
  songs: state.data.results
}))(Song)
