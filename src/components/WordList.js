import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    TouchableHighlight,
    ActivityIndicator,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../style/Color';
import Style from '../style/Style';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';


class WordList extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            dataSource: ds.cloneWithRowsAndSections({
                "あ": [
                    {
                        "id": 0,
                        "word": "あい",
                        "meaning": "あいの説明"
                    },
                    {
                        "id": 1,
                        "word": "あゆ",
                        "meaning": "あゆの説明"
                    },
                    {
                        "id": 2,
                        "word": "あり",
                        "meaning": "ありの説明"
                    }
                ]
            }),
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: '辞書名',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerRight: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-add" onPress={() => navigation.dispatch({type: Actions.NAV_ADD_WORD})}></Icon.Button>,
        headerLeft: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-arrow-back" onPress={() => navigation.dispatch({type: Actions.NAV_BACK})}>戻る</Icon.Button>,
    });

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={Style.dictList.sectionHeader}>
                <Text>{sectionID}</Text>
            </View>
        )
    }

    renderFooter() {
        return (
            <View>
                <ActivityIndicator animating={true} size={'large'}/>
            </View>
        )
    }

    render() {
        return (
            <View>
                <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <TouchableHighlight underlayColor={Color.superLightGray} activeOpacity={0.8} onPress={() => {}}>
                    <View style={Style.dictList.list}>
                        <Text>{rowData["word"]}</Text>
                    </View>
                </TouchableHighlight>} renderSectionHeader={this.renderSectionHeader} renderFooter={this.renderFooter} onEndReachedThreshold={40}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({dictList: state.dicts, currentDict: state.currentDict});

// const mapDispatchToProps = dispatch => ({
//     currentDict: (id, name, description) => dispatch(addDict(id, name, description))
// });

export default connect(mapStateToProps)(WordList);
