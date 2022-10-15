let counter=0;

function exeCount(){
    counter++;
    return counter;
}

let inputKeys="";

//event引数をとるように変更する
//キーボード押した時とボタンクリック時のイベントがある
//KeyboardEvent:
//https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent
//MouseEvent:
//https://developer.mozilla.org/ja/docs/Web/API/MouseEvent
function showExeCount(event){
    let inputKey;
    if(event.key){
        inputKey=event.key;
    }else{
        inputKey=event.target.innerText;
    }

    //Enterキーが押された または Enterボタンが押された
    if(inputKey=="Enter"){
        //正誤判定
        const resultElement=document.getElementById("time");
        //wordgameオブジェクトのevaluation関数に入力してきた文字列を渡して、正誤判定を行う。
        if(wordgame.evaluation(inputKeys)){
            resultElement.innerText="正解";
        }else{
            resultElement.innerText="不正解";
        }
        return;//Enterの場合は文字入力はしないのでここで処理終了
    }

    //Deleteキーが押されたまたはDeleteボタンが押された
    //macの日本語キーボードはfn+backspace
    //Deleteが押された場合は保持されている文字列から最後の一文字を除いた文字列
    if(inputKey=="Delete"){
        //(入力されてきた文字の長さ-1)の長さを取り出す=最後の一文字を除いた文字列
        let deleteLast=inputKeys.substring(0,inputKeys.length-1);
    inputKeys=deleteLast;
    //一文字削除された文字列を表示する。
    const timeElement=
    document.getElementById("keyboardinput");
    timeElement.innerText=inputKeys;
    return;//Deleteに関する処理終了
}

    //通常の文字の場合は、保持している文字列に文字を付け加える
    inputKeys+=inputKey;

    //これまでに入力された文字列(inputkeys)を表示する。
    const timeElement=
    document.getElementById("keyboardinput");
    timeElement.innerText=inputKeys;
}

document.onkeydown=showExeCount;

const wordgame={
    question:"りんごの英単語は？",
    correct:"apple",
    evaluation:function(answer){
        return wordgame.correct==answer;
    }
};

console.log(wordgame.evaluation("apple"));

function showAlphabet(){
    const virtualKyboard=
document.getElementById("virtualkeyboard");
const aCharCode='a'.charCodeAt(0);
for(let i=aCharCode; i<aCharCode+26; i++){
const letter=String.fromCharCode(i)
const childButton=document.createElement("button");
childButton.innerText=letter;
childButton.onclick=showExeCount;
virtualKyboard.appendChild(childButton);
}

//「Enter」ボタンの作成
const enterButton=document.createElement("button");
enterButton.innerText="Enter";
enterButton.onclick=showExeCount;
virtualKyboard.appendChild(enterButton);

//「Delete」ボタンの作成
const deleteButton=document.createElement("button");
deleteButton.innerText="Delete"
deleteButton.onclick=showExeCount;
virtualKyboard.appendChild(deleteButton);

}

showAlphabet();

const questionElement=document.getElementById("question")
questionElement.innerText=wordgame.question;