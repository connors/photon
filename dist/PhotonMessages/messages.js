
const Messages = {
  MessagesView: require('./MessagesView'),
  MessageContent: require('./MessageContent'),
  MessageDescription: require('./MessageDescription')
};



customElements.define("messages-view", Messages.MessagesView);
customElements.define("message-content", Messages.MessageContent);
customElements.define("message-description", Messages.MessageDescription);
