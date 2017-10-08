import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { connect }  from 'react-redux';

import Header from '../Header/Header.jsx';
import SongList from '../SongList/SongList.jsx';

import { sort } from '../../redux/actions';

import styles from './Home.scss'

class Home extends Component {

    handleItemClick(e, { name }) {
        this.props.dispatch(sort(name))
    }

    render() {
        return(
            <div className="Home">
                <Header />
                <Menu text>
                    <Menu.Item header>Sort By</Menu.Item>
                    <Menu.Item name='name' active={this.props.sort.name !== null} onClick={this.handleItemClick.bind(this)}>
                        Name
                        {this.props.sort.name === 'ASC' ? <Icon name='caret down' /> : null}
                        {this.props.sort.name === 'DESC' ? <Icon name='caret up' /> : null}
                    </Menu.Item>
                    <Menu.Item name='artist' active={this.props.sort.artist !== null} onClick={this.handleItemClick.bind(this)}>
                        Artist
                        {this.props.sort.artist === 'ASC' ? <Icon name='caret down' /> : null}
                        {this.props.sort.artist === 'DESC' ? <Icon name='caret up' /> : null}
                    </Menu.Item>
                    <Menu.Item name='popularity' active={this.props.sort.artist !== null} onClick={this.handleItemClick.bind(this)}>
                        Popularity
                        {this.props.sort.popularity === 'ASC' ? <Icon name='caret down' /> : null}
                        {this.props.sort.popularity === 'DESC' ? <Icon name='caret up' /> : null}
                    </Menu.Item>
                </Menu>
                <SongList /> 
            </div>
        )
    }
}

Home.propTypes = {
    sort: PropTypes.shape({
        name: PropTypes.string,
        artist: PropTypes.string,
    })
}

export default connect(state => ({
    sort: state.sort
}))(Home);
