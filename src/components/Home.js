import React, {Component} from 'react';
import {View, ScrollView, TouchableHighlight, Button, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../style/Color';
import Style from '../style/Style';
import {test, addTodo} from '../actions/action';

class Home extends Component {
    constructor(props) {
        super();
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: '一覧',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerRight: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-add" onPress={() => navigation.navigate('AddDict')}></Icon.Button>,
        headerLeft: <Text></Text>
    });

    render() {
        const {dispatch} = this.props.navigation;

        return (
            <View>
                <ScrollView style={Style.home.dictionaries.scrollArea}>
                    <View style={Style.home.dictionaries.row}>
                        <TouchableHighlight style={Style.home.dictionaries.addButton} activeOpacity={0.9} onPress={() => dispatch({type: 'AddDict'})}>
                            <View style={Style.home.dictionaries.add}>
                                <Icon style={Style.home.dictionaries.addIcon} size={40} name="ios-add"></Icon>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={Style.home.dictionaries.cellButton} activeOpacity={0.9} onPress={() => navigate('WordList')}>
                            <View style={Style.home.dictionaries.cell}></View>
                        </TouchableHighlight>
                        <View style={Style.home.dictionaries.cell}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Home;
