import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../style/Color';
import Style from '../style/Style';
import {connect} from 'react-redux';
import {addDict} from '../actions/action';

class AddDict extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: '辞書の追加',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerLeft: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-arrow-back" onPress={() => navigation.dispatch({type: 'Back'})}>戻る</Icon.Button>
    });

    addNewDict() {
        const id = this.props.dictList.length ? this.props.dictList.length : 0;
        this.props.addDict(id, this.state.name, this.state.description);
    }

    render() {
        return (
            <ScrollView style={Style.home.dictionaries.scrollArea}>
                <View style={Style.common.formArea}>
                    <TextInput placeholder="辞書名" style={Style.common.textInput} onChangeText={(name) => this.setState({name})} value={this.state.name} editable={true} maxLength={40}/>

                    <TextInput placeholder="説明" style={Style.common.textInput} onChangeText={(description) => this.setState({description})} value={this.state.description} editable={true} maxLength={40}/>

                    <TouchableOpacity onPress={this.addNewDict.bind(this)}>
                        <View style={Style.common.button.regist}>
                            <Text style={Style.common.button.text}>登録</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({dictList: state.dicts});

const mapDispatchToProps = dispatch => ({
    addDict: (id, name, description) => dispatch(addDict(id, name, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDict);
