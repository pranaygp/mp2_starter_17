import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header.jsx';

import styles from './Gallery.scss'

class Gallery extends Component {
    render() {
        return(
            <div className="Gallery">
                <Header />
            </div>
        )
    }
}

export default Gallery
