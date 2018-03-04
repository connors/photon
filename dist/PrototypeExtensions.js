module.exports = {
  nodePos(e) {
    for (var i = 0; i < e.parentNode.children.length; i++) {
      if (e.parentNode.children[i] === e) {
        return i;
      }
    }
  }
};
