import React, {PropTypes} from 'react';
import {StackNavigator, addNavigationHelpers} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from './Home';
import AddDict from './AddDict';
import WordList from './WordList';
import AddWord from './AddWord';


export const AppNavigator = StackNavigator({
    Home: {
        screen: Home
    },
    AddDict: {
        screen: AddDict
    },
    WordList: {
        screen: WordList
    },
    AddWord: {
        screen: AddWord
    }
});

const AppWithNavigationState = ({dispatch, nav}) => (<AppNavigator navigation = {
    addNavigationHelpers({dispatch: dispatch, state: nav})
} />);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({nav: state.nav});

export default connect(mapStateToProps)(AppWithNavigationState);
