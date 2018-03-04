const Button = {
  __mouseDown(event) {
    var btn = event.target.closest("*:not(btn-group) > .btn-system:not(.active)");
    if (btn) {
      // Clone button for sandboxing
      var sandboxBtn = btn.cloneNode(true);
      sandboxBtn.classList.add("sandbox");
      // Append the sanbox button to the DOM
      document.body.appendChild(sandboxBtn);
      // Get informations from sandbox button
      var sandboxBoundings = sandboxBtn.getBoundingClientRect();
      // Remove sanbox button from DOM
      document.body.removeChild(sandboxBtn);
      // Round up to 4 decimal numbers because more are not supported by CSS
      btn.style.width = sandboxBoundings.width + "px";
      // Add this width as stamp
      btn.__photonModifiedWidth = btn.style.width;
    }
  },
  __mouseUp(event) {
    var btns = document.getElementsByTagName("button");
    for (let btn of btns) {
      if (btn.__photonModifiedWidth === btn.style.width) {
        btn.style.removeProperty("width");
        delete btn.__photonModifiedWidth;
      }
    }
  }
};

window.addEventListener("mousedown", Button.__mouseDown);
window.addEventListener("mouseup", Button.__mouseUp);

module.exports = Button;
