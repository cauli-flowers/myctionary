import React, {Component} from 'react';
import {
    View,
    ScrollView,
    TouchableHighlight,
    Button,
    Text,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../style/Color';
import Style from '../style/Style';
import {connect} from 'react-redux';

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

    async displayProps() {
        console.log('************ Home Props');
        console.info(this.props);
        const dictList = this.props.dictList
            ? this.props.dictList
            : [];
        await AsyncStorage.setItem('@myctionary:dictList', JSON.stringify(dictList));
        const vl = await AsyncStorage.getItem('@myctionary:dictList');
        console.info(vl);
    }

    componentWillReceiveProps() {
        console.log('**************************** componentWillReceiveProps');
        this.displayProps();
    }

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
                        {(() => {
                            const listLength = this.props.dictList.length;
                            console.log('Home: listLength: ' + listLength);
                            if (listLength > 0) {
                                const returnContents = [];
                                this.props.dictList.map((key) => {
                                    const name = key['name'];
                                    const id = key['id'];
                                    returnContents.push(
                                        <TouchableHighlight key={id} style={Style.home.dictionaries.cellButton} activeOpacity={0.9} onPress={this.displayProps.bind(this)}>
                                            <View style={Style.home.dictionaries.cell}>
                                                <Text>{name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                })
                                return returnContents;
                            }
                        })()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({dictList: state.dicts});
export default connect(mapStateToProps)(Home);
