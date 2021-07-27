var prop = PropertiesService.getScriptProperties().getProperties();
var CHANNEL_ACCESS_TOKEN = prop.CHANNEL_ACCESS_TOKEN;
var MOMO_ID = prop.MY_ID;
var REPLY_URL = 'https://api.line.me/v2/bot/message/reply';
var SPREAD_SHEET_ID = prop.SPREAD_SHEET_ID;
var spreadsheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);
var sheet = spreadsheet.getSheetByName('log');
var debugSheet = spreadsheet.getSheetByName('debug');


function doPost(e){
  const responseLine = e.postData.contents;
  const event = JSON.parse(responseLine).events[0];
  const USER_ID = event.source.userId;
  const replyToken = event.replyToken;
  if(typeof replyToken === 'underfined'){
    return;
  }

  const userMessage = event.message.text;
  const date = new Date(Math.floor(new Date().getTime()/1000/60/5)*1000*60*5);

  const Year = date.getFullYear();
  const Month = date.getMonth()+1;
  const Day = date.getDate();
  const Hour = date.getHours().toString().padStart(2, '0');
  const Min = date.getMinutes().toString().padStart(2, '0');

  const now = Year + "年" + Month + "月" + Day + "日";
  let time =  Hour + ":" + Min;
  time = "・" + time.toString();
  let msg;
  if(userMessage == "リストちょうだい"){
    let msgList = sendSummary("♡ここまでのまとめ♡", USER_ID);
    msg = [{
        'type':'text',
        'text': msgList
      }];
  } else {
    msg = quickReply(userMessage);
  }
  
  writeSpreadSheet(USER_ID, now, time, userMessage);

  UrlFetchApp.fetch(REPLY_URL,{
    'headers':{
      'Content-Type':'application/json; charset=UTF-8',
      'Authorization':'Bearer '+ CHANNEL_ACCESS_TOKEN,
    },
    'method':'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': msg
    }),
  });
  try {
    const response = ContentService.createTextOutput(JSON.stringify({'content':'post ok'})).setMimeType(ContentService.MimeType.JSON);
    return response;
  } catch(e){
    console.error(e);
  }
}

function quickReply(userMessage){
  let msg;
  const msgMilk = [
  {
    'type':'text',
    'text': '飲んだ量をキロクしておけるよ！',
    "quickReply": {
      "items": [
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "30ml",
            "text": "30ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "40ml",
            "text": "40ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "50ml",
            "text": "50ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "60ml",
            "text": "60ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "70ml",
            "text": "70ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "80ml",
            "text": "80ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "90ml",
            "text": "90ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "100ml",
            "text": "100ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "120ml",
            "text": "120ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "140ml",
            "text": "140ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "160ml",
            "text": "160ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "200ml",
            "text": "200ml"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "240ml",
            "text": "240ml"
          }
        }
      ]
    }
  }];

  const msgOppai = [
  {
    'type':'text',
    'text': '「おちまい」タップで時間をキロクできるよ',
    "quickReply": {
      "items": [
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "🕐おっぱいタイムおちまい",
            "text": "おっぱいタイムおちまい"
          }
        }
      ]
    }
  }];

  if(userMessage.match(/.{1,3}おちっち|うんちっち$/)){
    msg = [{
        'type':'text',
        'text':`おむつ交換ありがとう♡`
      }];
    return msg;
  } else if(userMessage.match(/.{1,3}ミルク$/)){
    msg = msgMilk;
    return msg;
  } else if(userMessage.match(/.{1,3}おっぱい$/)){
    msg = msgOppai;
    return msg;
  } else if(userMessage.match(/.{1,3}すやすや$/)){
    msg = [{
        'type':'text',
        'text':`一緒に寝たりゆったりする時間になったらいいな🥺`
      }];
    return msg;
  } else if(userMessage.match(/.{1,3}おはよー$/)){
    msg = [{
        'type':'text',
        'text':`きゃんわわ〜♡`
      }];
    return msg;
  } else {
    msg = [{
        'type':'text',
        'text':`${userMessage} をキロクしまちた♡`
      }];
    return msg;
  }
}

function writeSpreadSheet(userId, date, time, userMessage){
  switch (true) {
  case userMessage.includes("おっぱいタイムおちまい"):
    userMessage = "おっぱい終了";
    break;
  case userMessage.includes("おちっち"):
    userMessage = "💧おしっこ";
    break;
  case userMessage.includes("うんちっち"):
    userMessage = "💩うんち";
    break;
  case userMessage.includes("すやすや"):
    userMessage = "😴寝た";
    break;
  case userMessage.includes("おはよ"):
    userMessage = "😃起きた";
    break;

  default:
    break;
  }
  sheet.appendRow([userId, date, time, userMessage]);
}

function sendSummary(when, userID){
  const values = sheet.getDataRange().getValues();
  const numRow = values.length;
  const date = new Date();
  const Year = date.getFullYear();
  const Month = date.getMonth()+1;
  const Day = date.getDate();
  const Week = date.getDay() ;	// 曜日(数値)
  const WeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][Week] ;

  const today = Year + "年" + Month + "月" + Day + "日";
  let listMsg = `${Month}/${Day}(${WeekStr}) ${when}\n`;
  let listTime;
  let listContent;
  let countOyasumi = 0;
  let countOshikko = 0;
  let countUnchi = 0;
  let countOppai = 0;
  let countMilk = 0;
  let countMilkMl = 0;

  for(let i = 1; i < parseInt(numRow)+1; i++){
    let range = sheet.getRange(1, 2, i);
    if(range.getValue() == today){
      listTime = sheet.getRange(i, 3).getValue();
      listContent = sheet.getRange(i, 4).getValue();

      if(listContent.match(/.{1,3}うんち$/)){
        countUnchi++;
      } else if (listContent.match(/.{1,3}おしっこ$/)){
        countOshikko++;
      } else if (listContent.match(/.{1,3}おっぱい$/)){
        countOppai++;
      } else if (listContent.match(/.{1,3}ミルク$/)){
        countMilk++;
      } else if (listContent.match(/.{1,3}寝た$/)){
        countOyasumi++;
      } else if (listContent.includes("ml") || listContent.includes("ミリ")){
        countMilkMl += parseInt(listContent.replace(/[^0-9]/g, ''));
      }
      if(listContent != "リストちょうだい"){
        listMsg += listTime + " "+ listContent + "\n";
      }
    }
  }
  
  if((countUnchi + countOppai + countMilk) > 0){
    listMsg += `----------------\n`;
    if (countOyasumi > 0){
      listMsg += `😴寝た ${countOyasumi}回\n`;
    } 
    if (countOppai > 0){
      listMsg += `🤱おっぱい ${countOppai}回\n`;
    } 
    if (countMilk > 0){
      if(countMilkMl > 0){
        listMsg += `🍼ミルク ${countMilk}回（${countMilkMl}ml）\n`;
      } else {
        listMsg += `🍼ミルク ${countMilk}回\n`;
      }
    }
    if(countUnchi > 0){
      listMsg += `💩うんち ${countUnchi}回\n`;
    } 
    if(countOshikko > 0){
      listMsg += `💩💧おむつ替え ${countUnchi + countOshikko}回`;
    }
  }
  return listMsg;
}

function push_message() {
  const PUSH_URL = "https://api.line.me/v2/bot/message/push";
  let msg;
  new Promise((resolve) => {
    msg = sendSummary("きょうのまとめ");
    resolve();
  }).then(() => {
      logClear();
  });

  var postData = {
    "to": MOMO_ID,
    "messages": [{
      "type": "text",
      "text": msg
    }]
  };

  var headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  
  try {
    var response = UrlFetchApp.fetch(PUSH_URL, options);
    return response.getResponseCode();

  } catch(e) {
    console.log(e);
  }
}
function logClear() {
  sheet.clear();
}

function debugLog(e){
  debugSheet.appendRow([e]);
}