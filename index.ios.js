import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import AppWithNavigationState from './src/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppReducer from './src/reducer';

export default class myctionary extends Component {
    store = createStore(AppReducer);

    render() {
        console.info(this.store.getState());
        return (
            <Provider store={this.store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('myctionary', () => myctionary);
