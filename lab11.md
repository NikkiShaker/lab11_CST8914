1. What is the keyboard interaction missing
    * The missing keyboard interactions in the accordion include tab key navigation (to move focus between buttons) and up/down buttons to toggle the aria-expanded state and show/hide panels. Focus must remain on the button after toggling, not shift into the panel. These issues can be resolved by adding keydown event listeners to handle these keys and ensuring proper updates to aria-expanded.
    *
2. What is the ARIA missing
    * The 'aria-expanded' which indicates if the accordion is currently expanded, and the aria-controls which links the buttons to the content with an ID.
