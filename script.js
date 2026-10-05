// 1. Generate a random integer between 1 and 100 inclusive
function generateElement() {
  return Math.floor(Math.random() * 100) + 1;
}

// 2. Return an array of 5 random integers
function generateArray() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(generateElement());
  }
  return arr;
}

// 3. Return an empty div element
function generateContainer() {
  return document.createElement("div");
}

// 4. Populate an element with 5 spans containing array values
function fillArrContainer(element, arr) {
  element.innerHTML = "";
  arr.forEach((num) => {
    const span = document.createElement("span");
    span.textContent = num;
    element.appendChild(span);
  });
}

// 5. Return true if first integer is less than or equal to second
function isOrdered(a, b) {
  return a <= b;
}

// 6. Swap elements in place if out of order
function swapElements(arr, index) {
  if (!isOrdered(arr[index], arr[index + 1])) {
    const temp = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = temp;
  }
}

// 7. Highlight descendants at index and index + 1 with a dashed red border
function highlightCurrentEls(element, index) {
  const children = element.children;
  if (children[index] && children[index + 1]) {
    children[index].style.border = "2px dashed red";
    children[index + 1].style.border = "2px dashed red";
  }
}

// DOM Elements
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");
const arrayContainer = document.getElementById("array-container");
const startingArray = document.getElementById("starting-array");

let currentArray = [];

// Handle #generate-btn click
generateBtn.addEventListener("click", () => {
  arrayContainer.innerHTML = "";
  arrayContainer.appendChild(startingArray);

  currentArray = generateArray();
  fillArrContainer(startingArray, currentArray);
});

// Handle #sort-btn click
sortBtn.addEventListener("click", () => {
  if (currentArray.length === 0) return;

  // Reset arrayContainer keeping only #starting-array
  arrayContainer.innerHTML = "";
  arrayContainer.appendChild(startingArray);

  let arr = [...currentArray];
  let isFirstStep = true;
  let swapped;

  // Complete Bubble Sort algorithm tracking each comparison step
  do {
    swapped = false;
    for (let j = 0; j < arr.length - 1; j++) {
      let container;

      if (isFirstStep) {
        // Step 1: Use #starting-array directly
        container = startingArray;
        fillArrContainer(container, arr);
        highlightCurrentEls(container, j);
        isFirstStep = false;
      } else {
        // Subsequent comparison steps: generate a new div
        container = generateContainer();
        fillArrContainer(container, arr);
        highlightCurrentEls(container, j);
        arrayContainer.appendChild(container);
      }

      // Check if a swap is needed and perform it
      if (!isOrdered(arr[j], arr[j + 1])) {
        swapElements(arr, j);
        swapped = true;
      }
    }
  } while (swapped);

  // Final Step: Render the fully sorted array with a green border
  const finalContainer = generateContainer();
  fillArrContainer(finalContainer, arr);
  finalContainer.style.border = "2px solid green";
  arrayContainer.appendChild(finalContainer);
});
