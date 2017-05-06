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


class WordList extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            dataSource: ds.cloneWithRowsAndSections({
                'section1': [
                    'row 1', 'row 2', 'row 3', 'row 4'
                ],
                'section2': [
                    'row 1', 'row 2', 'row 3', 'row 4'
                ],
                'section3': [
                    'row 1', 'row 2', 'row 3', 'row 4'
                ],
                'section4': [
                    'row 1', 'row 2', 'row 3', 'row 4'
                ],
                'section5': ['row 1', 'row 2', 'row 3', 'row 4']
            }),
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        title: '辞書名',
        headerStyle: {
            backgroundColor: Color.white
        },
        headerRight: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-add" onPress={() => navigation.navigate('AddWord')}></Icon.Button>,
        headerLeft: <Icon.Button backgroundColor={Color.white} color={Color.pink} size={Style.common.navigation.button} name="ios-arrow-back" onPress={() => navigation.goBack()}>戻る</Icon.Button>,
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
                        <Text>{rowData}</Text>
                    </View>
                </TouchableHighlight>} renderSectionHeader={this.renderSectionHeader} renderFooter={this.renderFooter} onEndReachedThreshold={40}/>
            </View>
        )
    }
}

export default WordList;
