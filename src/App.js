import React, {
    PropTypes
} from 'react';
import {
    StackNavigator,
    addNavigationHelpers,
} from 'react-navigation';
import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import Home from './components/Home';
import AddDict from './components/AddDict';
import WordList from './components/WordList';
import AddWord from './components/AddWord';
import {
    test,
    addTodo
} from './actions/action'



export const App = StackNavigator({
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
    },
});

const AppWithNavigationState = ({
    dispatch,
    nav
}) => ( <
    App navigation = {
        addNavigationHelpers({
            dispatch: dispatch,
            state: nav
        })
    }
    />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
