import {
    combineReducers
} from 'redux';
import {
    NavigationActions
} from 'react-navigation';

import {AppNavigator} from './components/Navigator';
import * as Actions from './actions/action';


////////////////////////////////////////////////////////////////////
// ナビゲーション用
////////////////////////////////////////////////////////////////////

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('AddDict');
const initialNavState = AppNavigator.router.getStateForAction(firstAction, tempNavState);

function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case Actions.NAV_HOME:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: Actions.NAV_HOME
            }), state);
            break;
        case Actions.NAV_ADD_DICT:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: Actions.NAV_ADD_DICT
            }), state);
            break;
        case Actions.NAV_WORD_LIST:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: Actions.NAV_WORD_LIST
            }), state);
            break;
        case Actions.NAV_ADD_WORD:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: Actions.NAV_ADD_WORD
            }), state);
            break;
        case Actions.NAV_BACK:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
            break;
        default:
            nextState = state;
            break;
    }

    return nextState || state;
}


////////////////////////////////////////////////////////////////////
// 辞書用
////////////////////////////////////////////////////////////////////

const initialDictState = {
    dicts: []
};

const dict = (state, action) => {
    switch (action.type) {
        case Actions.INITIAL_DICT:
            let list = [];
            action.data.map((key) => {
                list.push({
                    id: key['id'],
                    name: key['name'],
                    description: key['description'],
                })
            })
            return list;
        case Actions.ADD_DICT:
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
        case Actions.INITIAL_DICT:
            return dict(undefined, action);

        case Actions.ADD_DICT:
            return [
                ...state,
                dict(undefined, action)
            ]
        case Actions.DELETE_DICT:
            return { ...state,
            };
        default:
            return state;
    }
}


////////////////////////////////////////////////////////////////////
// 単語用
////////////////////////////////////////////////////////////////////

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
