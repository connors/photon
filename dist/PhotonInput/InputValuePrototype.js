const valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

Object.defineProperty(HTMLInputElement.prototype, "value", {
  get() {
   var suffix = this.getAttribute("data-suffix") || "";
   var value = valueDescriptor.get.apply(this);
   // If the type is "number", it will be replaced with "text" to allow normal chars like a-z. But it adds 'type-rule' for identifing it as an number field (only such fields will use the replace function that removes all chars except 0-9, '.' and '-')
   if (this.type === "number" && suffix) {
     this.type = "text";
     this.setAttribute("data-type-rule", "suffix");
   }
   // Replace all chars except 0-9, '.', '-'
   if (this.getAttribute("data-type-rule") === "suffix") {
     value = value.replace(/[^[0-9]\.\-]/g, "");
     return parseFloat(value) ? parseFloat(value) : value;
   }
   return value;
  },
  set(value) {
   var suffix = this.getAttribute("data-suffix") || "";
   // If the type is "number", it will be replaced with "text" to allow normal chars like a-z. But it adds 'type-rule' for identifing it as an number field (only such fields will use the replace function that removes all chars except 0-9, '.' and '-')
   if (this.type === "number" && suffix) {
     this.type = "text";
     this.setAttribute("data-type-rule", "suffix");
   }
   // Matches all input fields that have lost their 'number' type because of avoid the limitation 'number-chars-only'
   if (this.getAttribute("data-type-rule") === "suffix") {
     value = value + suffix;
   }
   valueDescriptor.set.apply(this, [value]);
   return true;
  }
});

const newValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");


window.addEventListener("change", function(event) {
  var suffix = event.target.getAttribute("data-suffix") || "";
  if (suffix) {
    event.target.value = event.target.value;
  }
});

window.addEventListener("load", function(event) {
  var numberSuffixInputs = document.querySelectorAll("input[data-suffix]");
  for (var i = 0; i < numberSuffixInputs.length; i++) {
    numberSuffixInputs[i].value = numberSuffixInputs[i].value;
  }
});



module.exports = newValueDescriptor;
