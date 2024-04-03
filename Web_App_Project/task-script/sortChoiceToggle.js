var sortByBtn = document.querySelector("#sortBy");
var sortChoiceEl = document.querySelector(".sort-choice");

function sortingSlide(){
    sortChoiceEl.classList.toggle("choice-on");
}

sortByBtn.onclick = sortingSlide;