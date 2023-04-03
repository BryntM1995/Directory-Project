let contactName;
let urlPicture = "../resources/nonAPicture.png";
let contactLastName;
let phoneNumber;
let dateOfBirth;
let id;
let description;
function addContact(){
    contactName = document.getElementById('contactName').value;
    contactLastName =document.getElementById('contactLastName').value;
    description= document.querySelector('#description').value;
    phoneNumber = document.getElementById('contactPhoneNumber').value;
    dateOfBirth = document.getElementById('dateValue').value;
    if (contactName ==""&& phoneNumber ==""&& dateOfBirth =="") {
        alert("Any data storaged");
        window.close();
    }
    else{
        const localData = JSON.stringify({contactName ,contactLastName, description,phoneNumber ,dateOfBirth ,urlPicture});
        idAutoIncrement();
        localStorage.setItem(id,localData);
        window.close();
        
    }
    window.location.reload();
}  

function idAutoIncrement(){
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    id = dateString+randomness;
}
submitBtn.addEventListener('click',addContact);

function previewFile() {
    const preview = document.querySelector('#profilepic');
    const file = document.querySelector('#inputPic').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
        urlPicture = reader.result;
        preview.setAttribute('src', reader.result);
    });
}