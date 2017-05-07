import {
    combineReducers
} from 'redux';
import {
    NavigationActions
} from 'react-navigation';

import {
    App
} from './App';


const firstAction = App.router.getActionForPathAndParams('Home');
const tempNavState = App.router.getStateForAction(firstAction);
const secondAction = App.router.getActionForPathAndParams('AddDict');
const initialNavState = App.router.getStateForAction(firstAction, tempNavState);


function nav(state = initialNavState, action) {
    let nextState;
    //alert('nav')
    switch (action.type) {
        case 'Home':
            nextState = App.router.getStateForAction(NavigationActions.navigate({
                routeName: 'Home'
            }), state);
            break;
        case 'AddDict':
            nextState = App.router.getStateForAction(NavigationActions.navigate({
                routeName: 'AddDict'
            }), state);
            break;
        case 'WordList':
            nextState = App.router.getStateForAction(NavigationActions.navigate({
                routeName: 'WordList'
            }), state);
            break;
        case 'AddWord':
            nextState = App.router.getStateForAction(NavigationActions.navigate({
                routeName: 'AddDict'
            }), state);
            break;
        case 'Back':
            nextState = App.router.getStateForAction(NavigationActions.back(), state);
            break;
        default:
            nextState = App.router.getStateForAction(NavigationActions.navigate({
                routeName: 'Home'
            }), state);
            break;
    }

    return nextState || state;
}

const initialDictState = {
    dicts: []
};

const dict = (state, action) => {
    switch (action.type) {
        case 'ADD_DICT':
            return {
                id: action.id,
                name: action.name,
                description: action.description,
            };
        default:
            return state
    }
}

function dicts(state = initialDictState, action) {
    switch (action.type) {
        case 'ADD_DICT':
            alert('ADD_DICT')
            return [
                ...state,
                dict(undefined, action)
            ]
        case 'DELETE_DICT':
            return { ...state,
            };
        default:
            return state;
    }
}

const initialWordState = {
    wordList: []
};

function word(state = initialWordState, action) {
    switch (action.type) {
        case 'ADD_WORD':
            return { ...state,
            };
        case 'DELETE_WORD':
            return { ...state,
            };
        default:
            return state;
    }
}

const AppReducer = combineReducers({
    nav,
    dicts,
    // word,
});

export default AppReducer;
