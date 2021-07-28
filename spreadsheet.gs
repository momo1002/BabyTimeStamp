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
  
  function logClear() {
    sheet.clear();
  }
  