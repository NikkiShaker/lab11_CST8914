//pseudocode
/*
  1.Grab the accordion buttons from the DOM
  2. go through each accordion button one by one
  3. Use the classlist dom method in combination with the toggle method provided by the DOM to add or remove the "is-open" class. At this point, the accordion button should be able to switch back and forth between its font awesome icons but there is no content inside of it. This is because of the overflow:hidden and the max-height of zero; it is hiding our content. So now we must use javascript to change these values with DOM CSS
  4. get the div that has the content of the accordion button you are currently looking at; we do this using the .nextElementSibling method which allows us to look at the html element that is directly next to the current html element we are looking at. Since we are currently looking at a button (accordion button), the next element after that is the div with the class accordion-content. This is exactly what we want because it allows us to work with the div that has the content that we want to display. Also please note that we could have got to this div in another way but this is the "shortest path" to our answer.
  
  5. set the max-height based on whether the current value of the max-height css property. If the max-height is currently 0 (if the page has just been visited for the first time) or null (if it has been toggled once already) which means that it is closed, you will give it an actual value so the content will be shown; if not then that means the max-height currently has a value and you can set it back to null to close it.
  6. If the accordion is closed we set the max-height of the currently hidden text inside the accordion from 0 to the scroll height of the content inside the accordion. The scroll height refers to the height of an html element in pixels. For this specific example, we are talking about the height of the div with the class accordion-content with all of its nested ptags
*/

/*
const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {

  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };

});*/

const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {
  // Handle click events for mouse
  accordion.onclick = toggleAccordion;

  // Handle keyboard events for Space and Enter
  accordion.addEventListener('keydown', function (event) {
    console.log("event.key: " + event.key)
    if (event.key === " " || event.key === "Enter" || event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();  // Prevent page scroll on space key press
      toggleAccordion.call(this);  // Call the toggle function
    } else if (event.key === "Tab") {
      // Focus the next accordion button
      const nextButton = this.parentElement.nextElementSibling?.querySelector('button');
      if (nextButton) {
        nextButton.focus();
      }
    } /*else if (event.key === "ArrowUp") {
      // Focus the previous accordion button
      const prevButton = this.parentElement.previousElementSibling?.querySelector('button');
      if (prevButton) {
        prevButton.focus();
      }
    }*/
  });

  // Function to toggle the accordion content
  function toggleAccordion() {
    // Toggle the button's "is-open" class
    this.classList.toggle("is-open");

    // Toggle aria-expanded based on the open/closed state
    const isExpanded = this.classList.contains("is-open");
    this.setAttribute("aria-expanded", isExpanded ? "true" : "false");

    // Get the accordion content (next sibling)
    let content = this.nextElementSibling;

    // Adjust the max-height to expand or collapse the content
    if (content.style.maxHeight) {
      // If the accordion is open, collapse it
      content.style.maxHeight = null;
      content.setAttribute("aria-hidden", "true");
    } else {
      // If the accordion is closed, expand it
      content.style.maxHeight = content.scrollHeight + "px";
      content.removeAttribute("aria-hidden");

      // Move focus to the first focusable element inside the expanded content
      const firstFocusable = content.querySelector('input, button, a, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }
});
