const PhotonContent = {
  ContentFrame: require('./ContentFrame'),
  FrameInner: require('./FrameInner'),
  ListSelect: require('./ListSelect')
};


customElements.define("content-frame", PhotonContent.ContentFrame);
customElements.define("frame-inner", PhotonContent.FrameInner);
customElements.define("list-select", PhotonContent.ListSelect);


module.exports = PhotonContent;
