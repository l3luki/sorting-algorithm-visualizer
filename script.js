const bubbleSortSelector = document.getElementById("bubble-sort-btn");
const insertionSortSelector = document.getElementById("insertion-sort-btn");
const selectionSortSelector = document.getElementById("selection-sort-btn");
const selectors = document.getElementsByClassName("selector");
const timeInput = document.getElementById("delay-input");
const amountInput = document.getElementById("amount");
const sortButton = document.getElementById("sort-btn");
const sortingContainer = document.getElementById("sorting-container")
const items = [...document.getElementsByClassName("item")];

let currentSortType = bubbleSort;
let currentDelay = 40;
let sortingIsFinished = true;
let sortable = false;


items.forEach((item, index) => {
  item.style.height = `${(index + 1) * 5}px`;
});

setItems();

function setItems() {
  items.forEach((item, index) => {
    item.style.order = index;
    item.style.backgroundColor = "White";
  });
}

function randomizeItems() {
  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  setItems();
  sortable = true;
}

function delay(ms = 40) {
  return new Promise((resolve) => setTimeout(resolve, ms)); // Delay function returning a promise
}

async function bubbleSort(ms) {
  sortingIsFinished = false;
  for (let i = 0; i < items.length - 1; i++) {
    for (let j = 0; j < items.length - 1 - i; j++) {
      if (parseInt(items[j].id) > parseInt(items[j + 1].id)) {
        items[j].style.backgroundColor = "Red";
        items[j + 1].style.backgroundColor = "Red";
        [items[j], items[j + 1]] = [items[j + 1], items[j]];
        items[j].style.order = j + 1;
        items[j + 1].style.order = j;
        await delay(ms);
      }
      items[j].style.backgroundColor = "White";
      items[j + 1].style.backgroundColor = "White";
    }
  }
  sortingIsFinished = true;
  sortable = false;
}

async function insertionSort(ms) {
  for (let i = 1; i < items.length; i++) {
    sortingIsFinished = false;
    let j = i
    while (j > 0) {
      if (parseInt(items[j - 1].id) > parseInt(items[j].id)) {
        items[j].style.backgroundColor = "Red";
        items[j - 1].style.backgroundColor = "Red";
        items[j - 1].style.order = j;
        items[j].style.order = j - 1;
        
        await delay(ms);
        
        [items[j - 1], items[j]] = [items[j], items[j - 1]];
        
        items[j - 1].style.backgroundColor = "White"; 
        items[j].style.backgroundColor = "White"
        
        j--;
      } else {
        break;
      }
    }
  }  

  sortingIsFinished = true;
  sortable = false;
}

function selectionSort() {
  sortingIsFinished = false;
console.log("started");
  for (let i = 0; i < items.length; i++) {
    
    let minIndex = 0;
    for (let j = i; j < items.length; j++) {
      if (items[j].id < items[minIndex].id) {
        [items[j], items[minIndex]] = [items[minIndex], items[j]];
        items[j].style.order = minIndex;
        items[minIndex].style.order = j;
        minIndex = j;
        console.log(`switched ${items[j]} and ${items[minIndex]}`)
      }
    }
  }
  sortingIsFinished = true;
  sortable = true;
}

function changeSortTypeSelection(sortName, sortFunction, sortId) {
  if (currentSortType.name !== sortName) {
    currentSortType = sortFunction;
    [...selectors].forEach((element) => {
      if (element.id == sortId) {
        element.classList.add("selected");
      } else {
        element.classList.remove("selected");
      }
    })
  }
}

function changeItemAmount () {

}


bubbleSortSelector.addEventListener("click", () => {
  changeSortTypeSelection("bubbleSort", bubbleSort, bubbleSortSelector.id)
});

insertionSortSelector.addEventListener("click", () => {
  changeSortTypeSelection("insertionSort", insertionSort, insertionSortSelector.id)
});

selectionSortSelector.addEventListener("click", () => {
  changeSortTypeSelection("selectionSort", selectionSort, selectionSortSelector.id);
});

sortButton.addEventListener("click", () => {
  if (sortingIsFinished) {
    if (sortable) {
      console.log(timeInput.value);
      currentSortType(timeInput.value)
      sortButton.textContent = "randomize"
    } else {
      randomizeItems();
      sortButton.textContent = "sort";
    }
  }
});

sortingContainer.addEventListener("click", () => {
  if (sortingIsFinished) {
    if (sortable) {
      currentSortType(parseInt(timeInput.value));
      sortButton.textContent = "randomize"
    } else {
      randomizeItems();
      sortButton.textContent = "sort";
    }
  }
});



