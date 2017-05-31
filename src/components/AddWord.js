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
            isValidate: false,
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: 'Add a New Word',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerLeft: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-arrow-back" onPress={() => navigation.dispatch({type: Actions.NAV_BACK})}>戻る</Icon.Button>,
    });

    addNewWord() {
        this.props.addWord(this.props.currentDict.currentDictId, 1, this.state.word, this.state.yomi, this.state.description);
        this.props.navigation.dispatch({type: Actions.NAV_BACK});
    }

    checkValidation(word, yomi, description) {
        if ((word && this.state.yomi && this.state.description)
            || (this.state.word && yomi && this.state.description)
            || (this.state.word && this.state.yomi && description)) {
            this.setState({isValidate: true});
        } else {
            this.setState({isValidate: false});
        }
    }

    renderRegistButton() {
        if (this.state.isValidate) {
            return (
                <TouchableOpacity onPress={this.addNewWord.bind(this)}>
                    <View style={Style.common.button.regist}>
                        <Text style={Style.common.button.text}>Registration</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={Style.common.button.disabledRegist}>
                    <Text style={Style.common.button.disabledText}>Registration</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView style={Style.home.dictionaries.scrollArea}>
                <View style={Style.common.formArea}>
                    <TextInput placeholder="word" style={Style.common.textInput} onChangeText={(word) => {this.setState({word}); this.checkValidation(word, null, null); displayButton();}} value={this.state.word} editable={true} maxLength={40}/>

                    <TextInput placeholder="pronunciation" style={Style.common.textInput} onChangeText={(yomi) => {this.setState({yomi}); this.checkValidation(null, yomi, null); displayButton();}} value={this.state.yomi} editable={true} maxLength={40}/>

                    <TextInput placeholder="meaning" style={Style.common.textInput} onChangeText={(description) => {this.setState({description});  this.checkValidation(null, null, description); displayButton();}} value={this.state.description} editable={true} maxLength={40}/>

                    {(displayButton = () => {
                        return this.renderRegistButton();
                    })()}
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({wordList: state.wordList, currentDict: state.currentDict});

const mapDispatchToProps = dispatch => ({
    addWord: (currentDictId, id, word, yomi, description) => dispatch(addWord(currentDictId, id, word, yomi, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWord);
