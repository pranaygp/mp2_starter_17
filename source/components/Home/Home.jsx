import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header.jsx';

import styles from './Home.scss'

class Home extends Component {
    render() {
        return(
            <div className="Home">
                <Header />
                
            </div>
        )
    }
}

export default Home
