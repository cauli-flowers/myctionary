import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../style/Color';
import Style from '../style/Style';
import {connect} from 'react-redux';
import {addWord} from '../actions/action';
import * as Actions from '../actions/action';


class AddWord extends Component {
    constructor() {
        super();
        this.state = {
            word: '',
            yomi: '',
            description: '',
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: '単語の追加',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerLeft: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-arrow-back" onPress={() => navigation.dispatch({type: Actions.NAV_BACK})}>戻る</Icon.Button>,
    });

    addNewWord() {
        // const id = this.props.wordList.length ? this.props.wordList.length : 0;
        this.props.addWord(this.props.currentDict.currentDictId, 1, this.state.word, this.state.yomi, this.state.description);
        this.props.navigation.dispatch({type: Actions.NAV_BACK});
    }

    render() {
        return (
            <ScrollView style={Style.home.dictionaries.scrollArea}>
                <View style={Style.common.formArea}>
                    <TextInput placeholder="単語名" style={Style.common.textInput} onChangeText={(word) => this.setState({word})} value={this.state.word} editable={true} maxLength={40}/>

                    <TextInput placeholder="読み方" style={Style.common.textInput} onChangeText={(yomi) => this.setState({yomi})} value={this.state.yomi} editable={true} maxLength={40}/>

                    <TextInput placeholder="意味" style={Style.common.textInput} onChangeText={(description) => this.setState({description})} value={this.state.description} editable={true} maxLength={40}/>

                    <TouchableOpacity onPress={this.addNewWord.bind(this)}>
                        <View style={Style.common.button.regist}>
                            <Text style={Style.common.button.text}>登録</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({wordList: state.wordList, currentDict: state.currentDict});

const mapDispatchToProps = dispatch => ({
    addWord: (currentDictId, id, name, yomi, description) => dispatch(addWord(currentDictId, id, name, yomi, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWord);
