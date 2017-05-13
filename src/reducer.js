import {
    combineReducers
} from 'redux';
import {
    NavigationActions
} from 'react-navigation';

import {AppNavigator} from './components/Navigator';
import * as actions from './actions/action';


const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('AddDict');
const initialNavState = AppNavigator.router.getStateForAction(firstAction, tempNavState);


function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'Home':
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: 'Home'
            }), state);
            break;
        case 'AddDict':
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: 'AddDict'
            }), state);
            break;
        case 'WordList':
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: 'WordList'
            }), state);
            break;
        case 'AddWord':
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: 'AddDict'
            }), state);
            break;
        case 'Back':
            nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
            break;
        default:
            nextState = state;
            break;
    }

    return nextState || state;
}

const initialDictState = {
    dicts: []
};

const dict = (state, action) => {
    switch (action.type) {
        case actions.INITIAL_DICT:
            let list = [];
            action.data.map((key) => {
                list.push({
                    id: key['id'],
                    name: key['name'],
                    description: key['description'],
                })
            })
            return list;
        case actions.ADD_DICT:
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
        case actions.INITIAL_DICT:
            return dict(undefined, action);

        case actions.ADD_DICT:
            return [
                ...state,
                dict(undefined, action)
            ]
        case actions.DELETE_DICT:
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
