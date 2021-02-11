//GETTING OF THE DOM ELEMENTS
const time = document.querySelector("#time");
const textarea = document.querySelector("#textarea");
const submit = document.querySelector("#submit");
const clearAll = document.querySelector("#ca");
const settingstwodiv = document.querySelector(".settingstwo");
const notask = document.querySelector(".nothing");
const defaultdiv = document.querySelector(".default");
const home = document.querySelector(".home");
const work = document.querySelector(".work");
const book = document.querySelector(".book");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const modal = document.querySelector(".modal");
const nameField = document.querySelector("#namefield");
const moveForward = document.querySelector("#moveforward");
//END OF DOM ELEMENTS

//VARIABLES AND ARRAYS
let diaryArray = [];
let value = "";
let mode = "defaultdiv";
let ownerName = nameField;

// FUNCTIONS BELOW
const setOwnerName = () => {
  ownerName = nameField.value;
  document.querySelector(".wrapper").style.overflow = "hidden";
  if (ownerName !== "") {
    moveForward.disabled = false;
  } else {
    moveForward.disabled = true;
  }
};
setOwnerName();
const moveAStepMyFriend = () => {
  document.querySelector(".wrapper").style.overflowY = "scroll";
  document.querySelector(".welcome").style.top = "-100%";
};
// disable the clear all button if there isnt any thing in the diary
const disableTheSubmitButton = () => {
  if (diaryArray.length <= 0) {
    clearAll.disabled = true;
  } else {
    clearAll.disabled = false;
  }
};
disableTheSubmitButton();
// this function below adds a zero to figures less than 9
const redef = (subject) => {
  if (subject < 10) {
    return "0" + subject;
  } else {
    return subject;
  }
};

// getting the time from the date method
const getTime = () => {
  let date = new Date();
  let Hour = date.getHours();
  let Minute = date.getMinutes();
  let timeString = `${redef(Hour)} : ${redef(Minute)} ${
    Hour < 12 ? "am" : "pm"
  }`;
  return timeString;
};

// This function keeps the time running in the background
const iterateTime = () => {
  time.innerHTML = getTime();
  var t = setTimeout(iterateTime, 1000);
};
iterateTime();

// Function gets the value of the textArea
const getValue = () => {
  return (value = textarea.value);
};

// this function Changes the mood of the user of the diary
const changeMode = (changed) => {
  mode = changed;
};

// function below gets the current date as at the object creation
const recordPeriod = () => {
  let period = new Date();
  let fullperiod = `${redef(period.getDate())}/${redef(
    period.getMonth()
  )}/${period.getFullYear()}`;
  return fullperiod;
};

//this function is the template for creating an Object that is pushed to the array
const createObject = () => {
  let diaryObject = new Object();
  diaryObject.text = getValue();
  diaryObject.time = getTime();
  diaryObject.date = recordPeriod();
  diaryObject.classChoice = mode;
  diaryObject.delFunc = function () {
    const setNewDiary = diaryArray.filter((item) => item.text !== this.text);
    diaryArray = setNewDiary;
    mapDiary();
    emptyState();
    disableTheSubmitButton();
  };
  diaryObject.editFunc = function () {
    textarea.value = this.text;
    const setNewDiary = diaryArray.filter((item) => item.text !== this.text);
    diaryArray = setNewDiary;
    mapDiary();
    emptyState();
  };
  return diaryObject;
};

// this is the map function to create the divs and append and assign items
const mapDiary = () => {
  settingstwodiv.innerHTML = "";
  if (diaryArray.length >= 1) {
    diaryArray.map((item) => {
      //Creating phase
      var newdiv = document.createElement("div");
      var divtext = document.createElement("div");
      var ptext = document.createElement("p");
      var divtime = document.createElement("div");
      var ptime = document.createElement("p");
      var divdate = document.createElement("div");
      var pdate = document.createElement("p");
      var divI = document.createElement("div");
      var deletei = document.createElement("i");
      var editi = document.createElement("i");
      var divPrefix = document.createElement("div");
      var pPrefix = document.createElement("p");
      var divSuffix = document.createElement("div");
      var pSuffix = document.createElement("p");
      var divDateAndTime = document.createElement("div");

      // Appending phase
      divPrefix.appendChild(pPrefix);
      divtext.appendChild(ptext);
      divtime.appendChild(ptime);
      divdate.appendChild(pdate);
      divDateAndTime.appendChild(divdate);
      divDateAndTime.appendChild(divtime);
      divI.appendChild(deletei);
      divI.appendChild(editi);
      divSuffix.appendChild(pSuffix);
      newdiv.appendChild(divPrefix);
      newdiv.appendChild(divtext);
      newdiv.appendChild(divDateAndTime);
      newdiv.appendChild(divI);
      newdiv.appendChild(divSuffix);
      settingstwodiv.appendChild(newdiv);

      //Adding classes to elements
      newdiv.classList.add(item.classChoice);
      newdiv.classList.add("newdiv");
      divPrefix.classList.add("deardiary");
      divDateAndTime.classList.add("currentdateandtime");
      divI.classList.add("icons");
      divtext.classList.add("mainnote");
      deletei.classList.add("fas");
      deletei.classList.add("fa-trash");
      editi.classList.add("fas");
      editi.classList.add("fa-edit");
      divSuffix.classList.add("yours-loved");

      // Setting values phase
      pPrefix.innerHTML = "Dear Diary,";
      pSuffix.innerHTML = `Yours Loved ${ownerName}`;
      ptext.innerHTML = item.text;
      ptime.innerHTML = item.time;
      pdate.innerHTML = item.date;
      deletei.addEventListener("click", item.delFunc.bind(item));
      editi.addEventListener("click", item.editFunc.bind(item));
    });
  }
};

// This function is made ready for the empty state array
const emptyState = () => {
  if (diaryArray.length === 0) {
    //CREATING PHASE
    let nullDiv = document.createElement("div");
    let nullP = document.createElement("p");

    //ADDING CLASS LIST
    nullDiv.classList.add("nulldiv");

    //APPENDING PHASE
    nullDiv.appendChild(nullP);
    settingstwodiv.appendChild(nullDiv);

    //ASSIGNING PHASE
    nullP.innerHTML = "Looks boring in here, speak to me how was your day!.";
  }
};
emptyState();

// this is the God father of all the creations it does the calling of majority of those functions and it is being assigned to the Submit button
const showValue = () => {
  console.log(diaryArray);
  if (value !== "") {
    createObject();
    diaryArray.push(createObject());
    mapDiary();
    textarea.value = "";
    disableTheSubmitButton();
    mode = "defaultdiv";
  }
};
const returnYesOrNoForClearingAll = (choice) => {
  if (choice === "yes") {
    diaryArray = [];
    mapDiary();
    emptyState();
    modal.style.display = "none";
    console.log(diaryArray);
    disableTheSubmitButton();
    document.querySelector(".wrapper").style.overflowY = "scroll";
  } else {
    modal.style.display = "none";
    console.log(diaryArray);
    disableTheSubmitButton();
    document.querySelector(".wrapper").style.overflowY = "scroll";
    return;
  }
};
const emergeTheModal = () => {
  modal.style.display = "flex";
  document.querySelector(".wrapper").style.overflow = "hidden";
};
//ADDING EVENT LISTENERS
textarea.addEventListener("input", getValue);
submit.addEventListener("click", showValue);
defaultdiv.addEventListener("click", () => changeMode("defaultdiv"));
home.addEventListener("click", () => changeMode("homediv"));
work.addEventListener("click", () => changeMode("workdiv"));
book.addEventListener("click", () => changeMode("bookdiv"));
clearAll.addEventListener("click", emergeTheModal);
yes.addEventListener("click", () =>
  returnYesOrNoForClearingAll(event.target.id)
);
no.addEventListener("click", () =>
  returnYesOrNoForClearingAll(event.target.id)
);
nameField.addEventListener("input", setOwnerName);
moveForward.addEventListener("click", moveAStepMyFriend);
