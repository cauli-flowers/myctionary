import React, {Component, PropTypes} from 'react';
import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AppWithNavigationState from './components/Navigator';
import {AsyncStorage, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import AppReducer from './reducer';
import {initialDict} from './actions/action';
import * as Keys from './storage/keys';


let store = createStore(AppReducer);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isStoreLoading: false,
        }
    }

    componentWillMount() {
        // AsyncStorage.removeItem(Keys.DICT_LIST);
        this.setState({isStoreLoading: true});
        AsyncStorage.getItem(Keys.DICT_LIST).then((value) => {
            if (value && value.length) {
                const jsonData = JSON.parse(value);
                store.dispatch(initialDict(jsonData));
            } else {
                const jsonData = [{
                    id: 0,
                    name: '追加ボタン用',
                    description: '初期表示時の追加ボタン用データ',
                }];
                store.dispatch(initialDict(jsonData));
            }
            this.setState({isStoreLoading: false});
        }).catch((error) => {
            const jsonData = [{
                id: 0,
                name: '追加ボタン用',
                description: '初期表示時の追加ボタン用データ',
            }];
            store.dispatch(initialDict(jsonData));
            this.setState({isStoreLoading: false});
        })
    }

    render() {
        if (this.state.isStoreLoading) {
            return (<Text>Loading Store ...</Text>)
        } else {
            return (
                <Provider store={store}>
                    <AppWithNavigationState/>
                </Provider>
            )
        }
    }
}

export default App;
