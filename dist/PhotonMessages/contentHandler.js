const staticHandlers = {
  descriptionDefault(descriptionElement, message, li, self) {
    const now = new Date();
    const time = new Date(message.timestamp);
    var timeStr = time.getHours() + ":" + time.getMinutes();
    // If the difference of the message is more away than 1 day
    if (now.getTime() - time > 86400000 || true) {
      timeStr = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + ", " + timeStr
    }
    descriptionElement.append(timeStr);

    if (self.messages[message.id - 1] && message.timestamp - self.messages[message.id - 1].timestamp < 60 * 1000) {
      //descriptionElement.hidden = true;
    }
  }
};

module.exports = [
  {
    type: /^text\/.*$/,
    content(contentElement, message, li, self) {
      contentElement.append(message.content.source);
    },
    description: staticHandlers.descriptionDefault
  },
  {
    type: /^image\/.*$/,
    content(contentElement, message, li, self) {
      const img = document.createElement("img");
      img.src = message.content.source;
      contentElement.append(img);
      li.classList.add("attachment");
    },
    description: staticHandlers.descriptionDefault
  },
  {
    type: /^audio\/.*$/,
    content(contentElement, message, li, self) {

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = message.content.source;
      contentElement.append(audio);
      //console.log(audio);
      //audio.play();
      //audio.attachShadow({mode: 'open'});
      //audio.attachShadow({mode: 'close'});

      li.classList.add("attachment");
    },
    description: staticHandlers.descriptionDefault
  }
];
