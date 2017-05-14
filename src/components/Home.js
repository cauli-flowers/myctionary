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
import * as Keys from '../storage/keys';
import * as Actions from '../actions/action';
import {setCurrentDict} from '../actions/action';

class Home extends Component {
    constructor(props) {
        super();
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: '一覧',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerRight: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-add" onPress={() => navigation.dispatch({type: Actions.NAV_ADD_DICT})}></Icon.Button>,
        headerLeft: <Text></Text>
    });

    componentWillReceiveProps(nextProps) {
        console.info(nextProps)
        this.addStorage(nextProps.dictList, nextProps.wordList);
    }

    async displayProps() {
        const vl1 = await AsyncStorage.getItem(Keys.DICT_LIST);
        console.info(vl1);
    }

    async addStorage(dicts, words) {
        let saveList = [];
        const dictList = dicts
            ? dicts
            : [];
        const wordList = words
            ? words
            : [];
            
        saveList.push(dictList);
        saveList.push(wordList);

        await AsyncStorage.setItem(Keys.DICT_LIST, JSON.stringify(saveList));
    }

    render() {
        const {dispatch} = this.props.navigation;

        return (
            <View>
                <ScrollView style={Style.home.dictionaries.scrollArea}>
                    {(() => {
                        // 行カウント
                        const rowCount = this.props.dictList
                            ? Math.floor(this.props.dictList.length / 3) + 1
                            : 1;
                        // 最終的に表示されるコンテンツ
                        let resultContents = [];
                        // セルカウント用インデックス
                        let listIndex = 0;
                        for (let i = 0; i < rowCount; i++) {
                            const outerContents = [];
                            outerContents.push(
                                <View key={i} style={Style.home.dictionaries.row}>
                                    {(() => {
                                        // リストのサイズ
                                        const listLength = this.props.dictList.length;

                                        if (listLength > 0) {
                                            const innerContents = [];
                                            for (let i = listIndex; i < listIndex + 3; i++) {
                                                let item = this.props.dictList[i];
                                                if (item) {
                                                    const name = item['name'];
                                                    const id = item['id'];
                                                    // 1つ目は辞書追加用ボタンを追加
                                                    if (id === 0) {
                                                        innerContents.push(
                                                            <TouchableHighlight key={id} style={Style.home.dictionaries.addButton} activeOpacity={0.9} onPress={() => dispatch({type: Actions.NAV_ADD_DICT})}>
                                                                <View style={Style.home.dictionaries.add}>
                                                                    <Icon style={Style.home.dictionaries.addIcon} size={40} name="ios-add"></Icon>
                                                                </View>
                                                            </TouchableHighlight>
                                                        );
                                                    } else {
                                                        innerContents.push(
                                                            <TouchableHighlight key={id} style={Style.home.dictionaries.cellButton} activeOpacity={0.9} onPress={() => {this.displayProps(); this.props.setCurrentDict(id); dispatch({type: Actions.NAV_WORD_LIST})}}>
                                                                <View style={Style.home.dictionaries.cell}>
                                                                    <Text style={Style.home.dictionaries.cellText}>{name}</Text>
                                                                </View>
                                                            </TouchableHighlight>
                                                        );
                                                    }
                                                }
                                            }
                                            // 最終列のループかの判定
                                            let lastFlag = Math.floor((listLength - listIndex) / 3);
                                            // 空白セルを入れる件数
                                            let emptyCount = 3 - ((listLength - listIndex) % 3);

                                            // 最終列のセルループで、1列のセルの数が3未満の場合、セルが3つになるように空白セルを挿入する
                                            if (!lastFlag) {
                                                if (emptyCount >= 1) {
                                                    for (let i = 0; i < emptyCount; i++) {
                                                        innerContents.push(
                                                            <TouchableHighlight key={'emp' + i} style={Style.home.dictionaries.cellButton} activeOpacity={1}>
                                                                <View style={Style.home.dictionaries.emptyCell}>
                                                                    <Text></Text>
                                                                </View>
                                                            </TouchableHighlight>
                                                        );
                                                    }
                                                }
                                            }

                                            listIndex += 3;
                                            return innerContents;
                                        }
                                    })()}
                                </View>
                            )
                            resultContents.push(outerContents);
                        }
                        return resultContents;
                    })()}

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({dictList: state.dicts, wordList: state.wordList});

const mapDispatchToProps = dispatch => ({
    setCurrentDict: (id) => dispatch(setCurrentDict(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
