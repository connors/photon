const Navigation = {
  NavigationGroup: require("./NavGroup"),
  NavigationItem: require("./NavItem")
};

customElements.define("nav-group", Navigation.NavigationGroup);
customElements.define("nav-item", Navigation.NavigationItem);


console.log(Navigation);
