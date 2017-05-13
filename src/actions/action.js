export const INITIAL_DICT = 'INITIAL_DICT';
export const ADD_DICT = 'ADD_DICT';
export const ADD_WORD = 'ADD_WORD';
export const DELETE_DICT = 'DELETE_DICT';
export const DELETE_WORD = 'DELETE_WORD';


export const initialDict = (data) => ({
    type: INITIAL_DICT,
    data,
})

export const addDict = (id, name, description) => ({
    type: ADD_DICT,
    id: id,
    name: name,
    description: description,
});

export const addWord = () => ({
    type: ADD_WORD
});

export const deleteDict = () => ({
    type: DELETE_DICT
});

export const deleteWord = () => ({
    type: DELETE_WORD
});
