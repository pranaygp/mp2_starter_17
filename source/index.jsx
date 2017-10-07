import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
// Redux stuff
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from './redux/reducers';
import { auth } from './redux/actions';
// Base Routes
import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Song from './components/Song/Song.jsx';
// Styles
require('./styles/main.scss');

const finalReducer = combineReducers(reducers);
const store = createStore(finalReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Connect to Spotify
axios('https://spotify.aztec.website')
    .then(({data}) => {
        store.dispatch(auth(data))
    })
    .catch(console.error)

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/song/:id" component={Song} />
            </div>
        </Router>
    </Provider>,
    // Define your router and replace <Home /> with it!
    document.getElementById('app')
);
