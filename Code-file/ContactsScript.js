let contactName, contactLastName,description , phoneNumber , dateOfBirth, profileId , color;
let urlPicture = "../resources/nonAPicture.png";
let myModal = document.getElementById("myModal");
let myModalProfile = document.getElementById("myModalProfile");
const closeViewBtn = document.getElementsByClassName("close")[0];
const submitBtn = document.getElementById('submitBtn');
let preview = document.querySelector('#profilepic');
let imgModal = document.getElementById("picModal");
let h1FullName= document.getElementById("fullName");
let textDate = document.getElementById("bDate");
let textPhoneNum = document.getElementById("telePhoneNumber");
let descriptionStatus = document.querySelector('#currentDescription');
let closeProfile = document.querySelector('.newClose');
submitBtn.innerHTML=`<i class="fa-solid fa-floppy-disk"></i>`;


function showAll(){
    let body = document.createElement('tbody');
    body.id = 'contactList';
    for (let index = 0; index < localStorage.length; index++) {
        const idcontact = localStorage.key(index);
        const {contactName ,contactLastName,description ,phoneNumber ,dateOfBirth ,urlPicture} = 
        JSON.parse(localStorage.getItem(idcontact));
        let urlPictureImg = document.createElement('img');
        let nameTd = document.createElement('td');
        let lastNametd = document.createElement('td');
        let descriptionTd = document.createElement('td');
        let phoneNumbertd = document.createElement('td');
        let dateOfBirthtd = document.createElement('td');
        let deleteTd = document.createElement('td');
        let editTd = document.createElement('td'); // this should display a modal
        let deleteBtn = document.createElement('button');
        let editBtn = document.createElement('button');
        let row = document.createElement('tr');
        let userProfileTd = document.createElement('td');
        let userProfileBtn = document.createElement('button');
        let textImg = document.createElement('td');
            //setting Attributtes

        urlPictureImg.src = urlPicture;
        nameTd.textContent = contactName;
        lastNametd.textContent = contactLastName;
        descriptionTd.textContent = description;
        phoneNumbertd.textContent = phoneNumber;
        dateOfBirthtd.textContent= dateOfBirth;
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        userProfileBtn.innerHTML = `<i class="fa-sharp fa-solid fa-magnifying-glass"></i>`;

        deleteBtn.onclick = function () {
             remove(idcontact);
        }
        editBtn.onclick = function () {
            startEditMode(idcontact);
        }
        userProfileBtn.onclick = function(){
            myModalProfile.style.display = "block";
            toBuildContactProfile(idcontact);
        };

        //we have all classes below
        urlPictureImg.className = "userPic";
        nameTd.className="displayedName";
        lastNametd.className="displayedLastName";
        descriptionTd.className= "displayedDescription";
        phoneNumbertd.className="displayedPhoneNumber";
        dateOfBirthtd.className="displayedDateOfBirth";
        deleteBtn.className="displayedDeleteBtn";
        row.className="diplayedrow";
        editBtn.id = "myBtn";
        editBtn.className ="displayedEditBtn";
        userProfileBtn.className = "profileInfoDisplayed";

        //append section
        userProfileTd.appendChild(userProfileBtn);
        editTd.appendChild(editBtn);
        deleteTd.appendChild(deleteBtn);
        if (urlPictureImg.src.includes('image')) {
            row.appendChild(urlPictureImg);
        }
        else{
            returnRandomNum();
            textImg.className = "nonPic"
            textImg.style.backgroundColor = color;
            textImg.textContent = contactName.charAt(0);
            row.appendChild(textImg);
        }
        row.appendChild(nameTd);
        row.appendChild(lastNametd);
        row.appendChild(descriptionTd);
        row.appendChild(phoneNumbertd);
        row.appendChild(dateOfBirthtd);
        row.appendChild(deleteTd);
        row.appendChild(editTd);
        row.appendChild(userProfileTd);
        body.appendChild(row);
    }
    document.getElementById('contactList').replaceWith(body);
}
const remove = function (idcontact) {
    let confirmation = confirm("Do you really want to proceed?")
    confirmation && localStorage.removeItem(idcontact);
    showAll();
    window.location.reload();
}
submitBtn.addEventListener('click', function(){
    updateContact(profileId);
    myModal.style.display = "none";
})
const startEditMode = function (idcontact){
    profileId =idcontact;
    myModal.style.display = "block";
    setPreviousValues(idcontact);
}
const clearAll = function () {
    localStorage.clear();
    showAll();
    window.location.reload();
}
function previewFile() {
    const file = document.querySelector('#inputPic').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', function () {
        urlPicture = reader.result;
        preview.setAttribute('src', reader.result);
    });
}

closeViewBtn.onclick = function() {
    myModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == myModal) {
      myModal.style.display = "none";
    }
}

function setPreviousValues(idcontact){
    const {contactName ,contactLastName, description ,phoneNumber ,dateOfBirth ,urlPicture}
     = JSON.parse(localStorage.getItem(idcontact));
    preview.setAttribute('src',urlPicture);
    document.getElementById('description').value = description;
    document.getElementById('contactName').value = contactName;
    document.getElementById('contactLastName').value = contactLastName;
    document.getElementById('contactPhoneNumber').value = phoneNumber;
    document.getElementById('dateValue').value = dateOfBirth;
}
function updateContact(idcontact){
    urlPicture = preview.src;
    contactName = document.getElementById('contactName').value;
    contactLastName =document.getElementById('contactLastName').value;
    description = document.getElementById('description').value;
    phoneNumber = document.getElementById('contactPhoneNumber').value;
    dateOfBirth = document.getElementById('dateValue').value;
    if (contactName ==""&& phoneNumber =="") {
        alert("No data storaged");
        alert("Please fill out required information.");
    }
    else{
        let confirmation = confirm("This information is going to be updated, is that ok?");
        if (!confirmation) {
            myModalProfile.style.display = "none";
        }
        const localData = 
        JSON.stringify({contactName ,contactLastName,description ,phoneNumber ,dateOfBirth ,urlPicture});
        localStorage.setItem(idcontact, localData);
        alert("Data storage sucessfully.");
    }
    showAll();
    window.location.reload();
}
function toBuildContactProfile(idcontact){
    const {contactName ,contactLastName,description ,phoneNumber ,dateOfBirth ,urlPicture} 
    = JSON.parse(localStorage.getItem(idcontact));
    imgModal.src= urlPicture;
    h1FullName.textContent= `${contactName} ${contactLastName}`;
    descriptionStatus.textContent= `Status: ${description}`
    textDate.textContent = `Date of Birth: ${dateOfBirth}`;
    textPhoneNum.textContent = `Celphone Number: ${phoneNumber}`;
}
window.onload = showAll;
 
closeProfile.onclick = function() {
    myModalProfile.style.display = "none";
}

function toFindAUser() {
    let inputfilter = document.querySelector('#filterId').value;
    inputfilter = inputfilter.toLowerCase();
    let tdListNames = document.querySelectorAll('.displayedName');
    for (i = 0; i < tdListNames.length; i++) { 

        if (tdListNames[i].textContent.toLowerCase().includes(inputfilter)) {
            tdListNames[i].parentNode.style.display="table-row";
        }
        else {
            tdListNames[i].parentNode.style.display="none";               
        }
    }
}

function returnRandomNum(){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    color =  "#" + randomColor;
}