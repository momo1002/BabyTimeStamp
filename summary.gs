
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