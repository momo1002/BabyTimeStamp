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