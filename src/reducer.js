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
                list.push({id: key['id'], word: key['word'], yomi: key['yomi'], description: key['description']})
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
    let copyState = [];
    // stateのコピーを作成
    copyState = Object.assign(copyState , state);
    // 該当辞書データを取得
    let target = copyState[action.currentDictId - 1];
    // 辞書に単語を追加
    let newData = {id: action.id, word: action.word, yomi: action.yomi, description: action.description};
    let targetList = getTargetList(target.words);
    let start = action.yomi.substring(0, 1);
    let mergedData = mergeTargetArray(start, target.words, targetList, newData);
    //target.words.push({id: action.id, word: action.word, yomi: action.yomi, description: action.description});
    // 該当辞書を書き換え
    copyState[action.currentDictId - 1] = mergedData;

    return copyState;
}

/**
 * ワードリストの該当分類リストを取得
 *
 * @param  {[string]} start [単語の頭文字]
 * @param  {[array]} data [該当辞書の単語リスト]
 * @return {[array]}      [頭文字に該当する分類の単語リスト]
 */
const getTargetList = (start, data) => {
    for (let i in data) {
        if (i === start) {
            return data[i];
        }
    }
    return [];
}

/**
 * 新規データの追加とソート
 *
 * @param  {[string]} start           [単語の頭文字]
 * @param  {[object]} mergeTargetData [マージ対象データ]
 * @param  {[array]} targetList      [新規追加前リスト]
 * @param  {[object]} newData         [追加データ]
 * @return {[object]}                 [マージ後のデータ]
 */
const mergeTargetArray = (start, mergeTargetData, targetList, newData) => {
    let copyData = [];
    Object.assign(copyData, mergeTargetData);

    targetList.push(newData);

    targetArray.sort(function(a, b) {
        if (a.yomi < b.yomi)
            return -1;
        if (a.yomi > b.yomi)
            return 1;
        return 0;
    });

    copyData[0][convertStart(start)] = targetList;

    return copyData;
}

/**
 * 頭文字をひらがなまたはアルファベット大文字に置き換える
 *
 * @param  {[type]} start [description]
 * @return {[type]}       [description]
 */
function convertStart(start) {
    const hiragana = /[\u3041-\u3096]/g;
    const alphabet = /[A-B]/g
    let upperStr = start.toUpperCase();

    if (upperCaseStr.match(alphabet)) {
        return upperCaseStr
    }

    const mtc = start.match(hiragana);
    if (mtc) {
        return mtc[0];
    }

    return start.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
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
