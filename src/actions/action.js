// 画面遷移用
export const NAV_HOME = 'Home';
export const NAV_ADD_DICT = 'AddDict';
export const NAV_WORD_LIST = 'WordList';
export const NAV_ADD_WORD = 'AddWord';
export const NAV_BACK = 'Back';


// 辞書関連用
export const INITIAL_DICT = 'INITIAL_DICT';
export const INITIAL_WORD = 'INITIAL_WORD';
export const ADD_DICT = 'ADD_DICT';
export const ADD_WORD = 'ADD_WORD';
export const DELETE_DICT = 'DELETE_DICT';
export const DELETE_WORD = 'DELETE_WORD';
export const SET_CURRENT_DICT = 'SET_CURRENT_DICT';


export const initialDict = (data) => ({
    type: INITIAL_DICT,
    data,
})

export const initialWord = (data) => ({
    type: INITIAL_WORD,
    data,
})

export const addDict = (id, name, description) => ({
    type: ADD_DICT,
    id: id,
    name: name,
    description: description,
});

export const addWord = (currentDictId, id, name, yomi, description) => ({
    type: ADD_WORD,
    currentDictId: currentDictId,
    id: id,
    name: name,
    yomi: yomi,
    description: description,
});

export const deleteDict = () => ({
    type: DELETE_DICT
});

export const deleteWord = () => ({
    type: DELETE_WORD
});

export const setCurrentDict = (id) => ({
    type: SET_CURRENT_DICT,
    currentDictId: id,
});
