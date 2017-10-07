import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header.jsx';
import SongList from '../SongList/SongList.jsx';

import styles from './Home.scss'

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <Header />
                <SongList /> 
            </div>
        )
    }
}

export default Home
