// console.log("hello");
showNotes();

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  let noteDate = new Date();
  let date = noteDate.getDate();
  let month = noteDate.getMonth()+1;
  let year = noteDate.getFullYear();
  notesObj.forEach(function (element, index) {
    html += `
       <div class="card noteCard mx-2 my-2" style="width: 18rem;">
           <div class="card-body">
           <p> Date: ${date}/${month}/${year}</p>
             <h5 class="card-title">Note ${index + 1}</h5>
             <p class = "card-text">${element}</p>
             <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
           </div>
       </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note sectionabove to add notes"`;
  }
}

function deleteNode(index) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  console.log("Input event fired!", inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element){
      let cardTxt = element.getElementsByTagName("p")[0].innerText;
    //   console.log(cardTxt);
    if(cardTxt.includes(inputVal)){
        element.style.display = "block"
    }
    else{
        element.style.display = "none"
    }
  })
});




/*
Further Features
1. Add Title
2. Mark a note as Important
3. Separate notes by user
*/