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
import * as Actions from '../actions/action';

class AddDict extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            isValidate: false,
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: 'Add a New Dictionary',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerLeft: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-arrow-back" onPress={() => navigation.dispatch({type: Actions.NAV_BACK})}>戻る</Icon.Button>
    });

    addNewDict() {
        const id = this.props.dictList.length ? this.props.dictList.length : 0;
        this.props.addDict(id, this.state.name, this.state.description);
        this.props.navigation.dispatch({type: Actions.NAV_BACK});
    }

    checkValidation(name, description) {
        if ((name && this.state.description) || (this.state.name && description)) {
            this.setState({isValidate: true});
        } else {
            this.setState({isValidate: false});
        }
    }

    renderRegistButton() {
        if (this.state.isValidate) {

            return (
                <TouchableOpacity onPress={this.addNewDict.bind(this)}>
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
                    <TextInput placeholder="name" style={Style.common.textInput} onChangeText={(name) => {this.setState({name}); this.checkValidation(name, null); displayButton()}} value={this.state.name} editable={true} maxLength={15}/>

                    <TextInput placeholder="description" style={Style.common.textInput} onChangeText={(description) => {this.setState({description}); this.checkValidation(null, description); displayButton()}} value={this.state.description} editable={true} maxLength={50}/>

                    {(displayButton = () => {
                        return this.renderRegistButton();
                    })()}

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
