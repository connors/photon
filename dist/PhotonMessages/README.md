# Messages

![Messages](https://dev.maurice-conrad.eu/img/photon/messages.png)

## Layout

```html
<messages-view style="height: 100%; position: relative;">
  <ul class="messages">
    <!--Messages here-->
  </ul>
  <!--Sample Toolbar-->
  <div class="toolbar">
    <input type="text" class="message-input" placeholder="iMessage">
    <button class="btn btn-emojis btn-input" data-insert-target=".message-input"></button>
    <button class="btn btn-mic"></button>
  </div>
</messages-view>
```

### Message

A message is just an `<li>` element with a typically syntax.

```html
<li type="system">
  <message-content>
    Chat with Somebody
  </message-content>
  <message-description>
    Today, 11:00
  </message-description>
</li>
```

There exist **3** types of messages.

1. `system`: A message that comes from the chat system and is displayed in center of screen (no bubble)
2. `self`: A message that is sent from the client (blue)
3. `extern`: A message that was sent to the client (gray)

To define the `type` of a message, just set the `<li>`'s `type` attribute to `system`, `self` or `extern`.

### Toolbar

As you may already saw, you can use a **toolbar** for the bottom of your chat. The toolbar is optional.

This is a sample content for the toolbar but you can do whatever you want there.

```html
...
<div class="toolbar">
  <input type="text" class="message-input" placeholder="iMessage">
  <button class="btn btn-emojis btn-input" data-insert-target=".message-input"></button>
  <button class="btn btn-mic"></button>
</div>
...
```

## API

It is not very smart to add every message as elements. Therefore exist an API to handle a `<message-view>`'s lifecycle more smart.

### Get Messages

Just get the `messages` property of your `<messages-view>` element and you get every message as object.

```javascript
const messages = myMessageView.messages;

console.log(messages);
```

### Add Message

All keys of the options are optional.

#### Simple Text

```javascript
messagesView.add("Hey", {
  type: "self"
});
```

#### Image

```javascript
messagesView.add("https://maurice-conrad.eu/acting/images/big-narrenkaefig-5.jpg", {
  type: "self",
  content: {
    type: "image/png"
  }
});
```

You can pass the message source (Filepath or text string) as string to the method or into the `source` key of `content` in the object.
