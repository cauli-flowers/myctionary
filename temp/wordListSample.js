let data = [
    {
        "ア": [
            {
                "id": 0,
                "word": "あい",
                "yomi": "アイ",
                "meaning": "あいの説明"
            }, {
                "id": 1,
                "word": "あゆ",
                "yomi": "アユ",
                "meaning": "あゆの説明"
            }, {
                "id": 2,
                "word": "あり",
                "yomi": "アリ",
                "meaning": "ありの説明"
            }
        ],
        "イ": [
            {
                "id": 0,
                "word": "いと",
                "yomi": "イト",
                "meaning": "いとの説明"
            }
        ],
        "あ": [],
        "え": [],
        "る": [],
        "ル": [],
        "r": [],
        "e": [],
        "y": []
    }
];

console.info(data[0])

let yomi = "アイウエオ";
let word = "亜衣兎絵御";

let startStr = yomi.substring(0, 1);
console.log("startStr: " + startStr);

// data[0].map((key) => {
//     console.info(key)
// })

/**
 * ワードリストの該当分類リストを取得
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
const getTargetArray = (data) => {
    for (let i in data) {
        if (i === startStr) {
            return data[i];
        }
    }
    return [];
}

let targetArray = getTargetArray(data[0]);

console.log('targetArray');
console.info(targetArray);


const mergeTargetArray = (startStr, copyData, targetArray) => {
    targetArray.push({"id": 0, "word": word, "yomi": yomi, "meaning": "test"});

    console.log("sort");
    targetArray.sort(function(a, b) {
        // console.info(a);
        // console.info(b);
        if (a.yomi < b.yomi)
            return -1;
        if (a.yomi > b.yomi)
            return 1;
        return 0;
    });

    copyData[0][startStr] = targetArray;

    // copyData[0].sort(function(a, b) {
    //     console.info(a);
    //     console.info(b);
    //     return 0;
    // });

    return copyData;
}

let copyData = [];
Object.assign(copyData, data);

let mergedData = mergeTargetArray(startStr, copyData, targetArray);




console.log('mergedData');
console.info(mergedData);




function convertStartStr(src) {
    const hiragana = /[\u3041-\u3096]/g;
    const alphabet = /[A-B]/g
    let upperStr = src.toUpperCase();

    if (upperStr.match(alphabet)) {
        return upperStr
    }

    const mtc = src.match(hiragana);
    if (mtc) {
        return mtc[0];
    }

    return src.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

console.log(convertStartStr("あ"))
console.log(convertStartStr("い"))
console.log(convertStartStr("ヲ"))
console.log(convertStartStr("ケ"))
console.log(convertStartStr("A"))
console.log(convertStartStr("b"))
