import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router';
import { Card, Button, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import MyHeader from '../Header/Header.jsx';

import styles from './Song.scss'

class Song extends Component {

  renderControls() {
    const thisPage = Number(this.props.match.params.id);
    const hasPrevPage = thisPage > 0;
    const hasNextPage = thisPage < (this.props.songs.length - 1);
    return (
      <div>
        {hasPrevPage ? <Button content='Prev' icon='left arrow' labelPosition='left' onClick={(e) => { this.props.history.push(`/song/${thisPage-1}`) }} /> : null}
        {hasNextPage ? <Button content='Next' icon='right arrow' labelPosition='right' onClick={(e) => { this.props.history.push(`/song/${thisPage+1}`) }} /> : null}
      </div>
    )
  }

  render() {
    const thisPage = Number(this.props.match.params.id);
    const song = this.props.songs[thisPage];
    if(!song) {
      // missing data
      return <Redirect to='/' />
    }
    return(
      <div className="Song">
        <MyHeader search={false}/>
        <br />
        {this.renderControls()}
        <Card>
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

export default withRouter(connect(state => ({
  songs: state.data.results
}))(Song))
