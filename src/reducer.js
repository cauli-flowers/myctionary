import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';

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
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: Actions.NAV_HOME}), state);
            break;
        case Actions.NAV_ADD_DICT:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: Actions.NAV_ADD_DICT}), state);
            break;
        case Actions.NAV_WORD_LIST:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: Actions.NAV_WORD_LIST}), state);
            break;
        case Actions.NAV_ADD_WORD:
            nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: Actions.NAV_ADD_WORD}), state);
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
                list.push({id: key['id'], name: key['name'], description: key['description']})
            });
            return list;

        case Actions.ADD_DICT:
            return {id: action.id, name: action.name, description: action.description};

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

        default:
            return state;
    }
}

const initialCurrentDictState = {
    currentDictId: 0
};

function currentDict(state = initialCurrentDictState, action) {
    switch (action.type) {
        case Actions.SET_CURRENT_DICT:
            return {currentDictId: action.currentDictId};

        default:
            return state;
    }
}

////////////////////////////////////////////////////////////////////
// 単語用
////////////////////////////////////////////////////////////////////

const initialWordState = [];

const word = (state, action) => {
    switch (action.type) {
        case Actions.INITIAL_WORD:
            let list = [];
            action.data.map((key) => {
                list.push({dictId: key['dictId'], words: key['words']})
            });
            return list;

        case Actions.ADD_DICT:
            return {
                dictId: action.id,
                words: []
            };

        case Actions.ADD_WORD:
            return addWord(state, action);

        default:
            return state
    }
}

function addWord(state, action) {
    let copiedState = [];
    // stateのコピーを作成
    Object.assign(copiedState , state);

    // 該当辞書データを取得
    let target = copiedState.slice(0)[action.currentDictId - 1];

    target.words.push({
        id: action.id,
        word: action.name,
        yomi: action.yomi,
        description: action.description,
    });

    copiedState[action.currentDictId - 1] = target;

    return copiedState;
}

function wordList(state = initialWordState, action) {
    switch (action.type) {
        case Actions.INITIAL_WORD:
            return word(undefined, action);

        case Actions.ADD_DICT:
            return [
                ...state,
                word(undefined, action)
            ]

        case Actions.ADD_WORD:
            return word(state, action);

        default:
            return state;
    }
}

const AppReducer = combineReducers({nav, dicts, currentDict, wordList});

export default AppReducer;
