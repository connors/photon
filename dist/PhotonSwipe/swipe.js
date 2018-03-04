
const Swipe = {
  ListItem: require('./ListItem'),
  ListGroup: require('./ListGroup'),
  ListItemInner: require('./ListInner'),
  SwipeActionList: require('./ActionList'),
  SwipeAction: require('./SwipeAction')
};

customElements.define("list-group", Swipe.ListGroup);
customElements.define("list-item", Swipe.ListItem);
customElements.define("item-inner", Swipe.ListItemInner);
customElements.define("action-list", Swipe.SwipeActionList);
customElements.define("swipe-action", Swipe.SwipeAction);


module.exports = Swipe;
