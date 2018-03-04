
const Tab = {
  TabGroup: require('./TabGroup'),
  TabItem: require("./TabItem")
};


customElements.define("tab-group", Tab.TabGroup);
customElements.define("tab-item", Tab.TabItem);



module.exports = Tab;
