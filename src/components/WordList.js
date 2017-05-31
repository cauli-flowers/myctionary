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
    constructor(props) {
        super(props);
    }

    createDataSource() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        return ds.cloneWithRowsAndSections(
            this.createWordList(this.props.wordList[this.props.currentDict.currentDictId - 1].words)
        )
    }

    createWordList(data) {
        data.sort(function(a, b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });

        let sectionData = {};
        let tmpSectionArray = [];
        let nowInitial = "";
        const dataSize = data.length;
        data.forEach((d, i) => {
            const initial = d.word.substring(0, 1);
            if (nowInitial !== initial) {
                if (nowInitial !== "") {
                    sectionData[nowInitial] = tmpSectionArray.slice(0);
                }
                nowInitial = initial;
                tmpSectionArray = [];
            }
            tmpSectionArray.push(d);
            if (dataSize === i + 1) {
                sectionData[nowInitial] = tmpSectionArray.slice(0);
            }
        });

        return sectionData;
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
                {(() => {
                    const dataSource = this.createDataSource();

                    return (
                        <ListView dataSource={dataSource} renderRow={(rowData) => <TouchableHighlight underlayColor={Color.superLightGray} activeOpacity={0.8} onPress={() => {}}>
                            <View style={Style.dictList.list}>
                                <Text>{rowData.word}</Text>
                            </View>
                        </TouchableHighlight>} renderSectionHeader={this.renderSectionHeader} renderFooter={this.renderFooter} onEndReachedThreshold={40}/>
                    )
                })()}
            </View>
        )
    }
}

const mapStateToProps = state => ({dictList: state.dicts, wordList: state.wordList, currentDict: state.currentDict});

export default connect(mapStateToProps)(WordList);
