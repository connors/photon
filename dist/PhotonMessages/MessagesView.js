const { argumentsSort } = require('./../../helper');

class MessagesView extends HTMLElement {
  constructor() {
    super();

    //console.log(this);
  }
  add() {
    const self = this;

    var { message, text } = argumentsSort(arguments, {
      text: "string",
      message: "object"
    });

    message = (message || {}).fillDefaults({
      content: {
        type: "text/plains",
        source: text || ""
      },
      timestamp: new Date().getTime(),
      type: "self"
    });
    Object.defineProperty(message, "id", {
      get() {
        for (var i = 0; i < self.messages.length; i++) {
          if (this === self.messages[i]) {
            return i;
          }
        }
      }
    });

    this.messages.push(message);

    this.__render(message);

    return message;
  }
  __render(message) {
    const li = document.createElement("li");
    li.setAttribute("type", message.type);
    li.__proto__.message = message;

    const msgContent = document.createElement("message-content");
    const msgDescription = document.createElement("message-description");

    for (let handler of this.__contentTypeHandler) {
      let handleable = message.content.type.match(handler.type);
      if (handleable) {
        handler.content(msgContent, message, li, this);
        handler.description(msgDescription, message, li, this);
        break;
      }
    }

    li.appendChild(msgContent);
    li.appendChild(msgDescription);

    message.__listItem = li;

    this.messagesList.appendChild(li);
  }
  get messagesList() {
    return this.getElementsByClassName('messages')[0];
  }
}
MessagesView.prototype.messages = [];

MessagesView.prototype.__contentTypeHandler = require('./contentHandler.js');
module.exports = MessagesView;
