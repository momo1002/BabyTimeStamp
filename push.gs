function push_message() {
  const PUSH_URL = "https://api.line.me/v2/bot/message/push";
  const msg = sendSummary("きょうのまとめ",MOMO_ID);
  console.log(msg);
  // let msg;
  // new Promise((resolve) => {
  //   msg = sendSummary("きょうのまとめ");
  //   resolve();
  // }).then(() => logClear).catch(e => console.error(e));

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