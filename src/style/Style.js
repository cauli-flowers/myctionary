import Color from './Color';

const Style = {
    common: {
        navigation: {
            button: 25
        },
        button: {
            regist: {
                backgroundColor: Color.lightGray,
                borderWidth: 1,
                borderColor: Color.pink,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                marginLeft: 10,
                borderRadius: 3,
            },
            text: {
                color: Color.pink,
            },
            disabledRegist: {
                backgroundColor: Color.lightGray,
                borderWidth: 1,
                borderColor: Color.lightPink,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                marginLeft: 10,
                borderRadius: 3,
            },
            disabledText: {
                color: Color.lightPink,
            },
        },
        textInput: {
            height: 35,
            borderColor: Color.middleGray,
            borderWidth: 1,
            backgroundColor: Color.white,
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 10,
            borderRadius: 3,
            paddingLeft: 10,
            paddingRight: 10,
        },
        textArea: {
            height: 35,
            borderColor: Color.middleGray,
            borderWidth: 1,
            backgroundColor: Color.white,
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 10,
            borderRadius: 3,
            paddingLeft: 10,
            paddingRight: 10,
        },
        formArea: {
            marginBottom: 10,
            marginTop: 10,
        }
    },
    home: {
        dictionaries: {
            row: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
                marginBottom: 0,
            },
            add: {
                width: 100,
                height: 140,
                borderWidth: 1,
                backgroundColor: Color.lightGray,
                borderColor: Color.gray,
                alignItems: 'center',
                justifyContent: 'center'
            },
            addButton: {
                width: 100,
                height: 140,
                backgroundColor: Color.lightGray,
            },
            addIcon: {
                color: Color.pink,
                backgroundColor: Color.transparent,
            },
            cell: {
                width: 100,
                height: 140,
                backgroundColor: Color.powderblue
            },
            cellButton: {
                width: 100,
                height: 140,
                backgroundColor: Color.powderblue
            },
            cellText: {
                textAlign: 'center',
                margin: 10,
                marginTop: 20
            },
            emptyCell: {
                width: 100,
                height: 140,
                backgroundColor: Color.lightGray
            },
            scrollArea: {
                backgroundColor: Color.lightGray,
                height: '100%'
            }
        }
    },
    dictList: {
        sectionHeader: {
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Color.lightGray,
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 10,
            paddingRight: 10
        },
        scrollArea: {
            backgroundColor: Color.lightGray,
            height: '100%'
        },
        list: {
            width: '100%',
            flex: 1,
            backgroundColor: Color.white,
            borderBottomWidth: 1,
            borderColor: Color.lightGray,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10
        },
        touched: {
            backgroundColor: Color.middleGray
        }
    }
}

export default Style;
