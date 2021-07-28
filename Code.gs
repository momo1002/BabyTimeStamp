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
  if(typeof replyToken === 'underfined'){ return; }

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

function debugLog(e){
  debugSheet.appendRow([e]);
}