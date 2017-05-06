import {StackNavigator} from 'react-navigation';
import Home from './components/Home';
import AddDict from './components/AddDict';
import WordList from './components/WordList';
import AddWord from './components/AddWord';


const App = StackNavigator({
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

export default App;
