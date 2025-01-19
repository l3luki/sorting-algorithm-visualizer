const bubbleSortSelector = document.getElementById("bubble-sort-btn");
const insertionSortSelector = document.getElementById("insertion-sort-btn");
const selectionSortSelector = document.getElementById("selection-sort-btn");
const selectors = document.getElementsByClassName("selector");
const delayInput = document.getElementById("delay-input");
const itemAmountInput = document.getElementById("item-amount-input");
const sortButton = document.getElementById("sort-btn");
const sortingContainer = document.getElementById("sorting-container")
const items = [...document.getElementsByClassName("item")];
const clickSound = document.getElementById("click-audio");

let currentSortType = bubbleSort;
let itemAmount = 100;
let currentDelay = 40;
let sortingIsFinished = true;
let sortable = false;

items.forEach((item, index) => {
  const style = getComputedStyle(sortingContainer);
  const width = parseInt(style.getPropertyValue("width"));
  item.style.width = `${width / itemAmount}px`
  item.style.height = `${(index + 1) * 5}px`;
  clickSound.play();
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
    items[i].style.order = j;
    items[j].style.order = i;
    [items[i], items[j]] = [items[j], items[i]];
  }
  sortable = true;
}

function delay(ms = 40) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(ms) {
  sortingIsFinished = false;
  for (let i = 0; i < items.length - 1; i++) {
    for (let j = 0; j < items.length - 1 - i; j++) {
      items[j].style.backgroundColor = "Red";
      await delay(ms);
      items[j + 1].style.backgroundColor = "Red";
      items[j].style.backgroundColor = "White"
      await delay(ms);
      items[j].style.backgroundColor = "Red"
      await delay(ms);
      if (parseInt(items[j].id) > parseInt(items[j + 1].id)) {
        items[j].style.order = j + 1;
        items[j + 1].style.order = j;
        [items[j], items[j + 1]] = [items[j + 1], items[j]];
        clickSound.play();
        clickSound.pause();
      }
      items[j].style.backgroundColor = "White";
      items[j + 1].style.backgroundColor = "White";
      await delay(ms)
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
        await delay(ms);
        items[j - 1].style.backgroundColor = "Red";
        items[j - 1].style.order = j;
        items[j].style.order = j - 1;
        
        
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

async function selectionSort() {
  sortingIsFinished = false;
console.log("started");
  for (let i = 0; i < items.length; i++) {
    let minIndex = i;
    let j = i + 1;
    await delay();
    while (j < items.length) {
      if (parseInt(items[j].id) < parseInt(items[minIndex].id)) {
        console.log("switched: " + items[j].id, items[minIndex].id);
        minIndex = j;
      }
       
      j++;
    }
     
    console.log(minIndex, i);
     
    items[i].style.order = minIndex;
    items[minIndex].style.order = i;
    [items[i], items[minIndex]] = [items[minIndex], items[i]]; 
  }
  console.log(items);
  sortingIsFinished = true;
  sortable = false;
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
      currentSortType(currentDelay); 
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
      currentSortType(parseInt(delayInput.value));
      sortButton.textContent = "randomize"
    } else {
      randomizeItems();
      sortButton.textContent = "sort";
    }
  }
});

delayInput.addEventListener("input", () => {
  currentDelay = delayInput.value;
})



