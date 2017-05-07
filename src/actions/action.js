export const ADD_DICT = 'ADD_DICT';
export const ADD_WORD = 'ADD_WORD';
export const DELETE_DICT = 'DELETE_DICT';
export const DELETE_WORD = 'DELETE_WORD';


export default {
    test: () => {
        return {type: 'Text'}
    }
}

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    text
});

let dictId = 0;
export const addDict = (name, description) => ({
    type: ADD_DICT,
    id: dictId++,
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
