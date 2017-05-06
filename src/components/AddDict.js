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

class AddDict extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '辞書の追加',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerLeft: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-arrow-back" onPress={() => navigation.goBack()}>戻る</Icon.Button>
    });

    render() {
        return (
            <ScrollView style={Style.home.dictionaries.scrollArea}>
                <View style={Style.common.formArea}>
                    <TextInput placeholder="辞書名" style={Style.common.textInput} onChangeText={(text) => this.setState({text})} value={this.state.text} editable={true} maxLength={40}/>

                    <TextInput placeholder="説明" style={Style.common.textInput} onChangeText={(text) => this.setState({text})} value={this.state.text} editable={true} maxLength={40}/>

                    <TouchableOpacity onPress={() => {}}>
                        <View style={Style.common.button.regist}>
                            <Text style={Style.common.button.text}>登録</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default AddDict;
