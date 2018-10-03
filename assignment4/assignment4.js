// Global variables
const dropdownSize = 3;
const yearBornLimit = 1918;
var nameField = /^[a-zA-Z0-9\s.-]+$/;
var blankField = /^[\s]*$/;
var charField = /^[^\n]*$/;
var postalField = /^[a-z][0-9][a-z][\s-]?[0-9][a-z][0-9]$/i;
var emailField = /^[a-z\d.-]+@[a-z\d]+.[a-z\d]{2,3}$/i;
var passField = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
var currentYear = 2018;
var isFormValid = false;
var fName;
var lName;
var address;
var city;
var postal;
var province;
var pass;
var email;
var age;
//var fields = [fName, lName, address, city, postal, ];

function createYearBornDropDown() {
    var dropdown = document.getElementById("born");
    for (var i = currentYear; i >= yearBornLimit; i--) {
        var dropdownYear = document.createElement("option");
        dropdownYear.value = i;
        dropdownYear.innerHTML = i;
        dropdown.appendChild(dropdownYear);      
    }  
}

function displayDropDown(element) {
    var el = element.currentTarget;
    element.preventDefault();
    if (el.getAttribute("size") == 1) {
        el.className = "dropdown";
        el.setAttribute("size", dropdownSize);
        el.addEventListener("focusout", function () { el.setAttribute("size", 1); el.className = ""; }, false);
    }
    else {
        el.setAttribute("size", 1);
        el.className = "";
    }
}

function setPasswordVisible() {
    var icon = document.getElementById("hiddenPass");
    document.getElementById("password").setAttribute("type", "text");
    document.getElementById("cpassword").setAttribute("type", "text");
    icon.className = "fa fa-eye-slash fa-lg";
    icon.removeEventListener("click", setPasswordVisible, false);
    icon.addEventListener("click", setPasswordInvisible, false);
    
}

function setPasswordInvisible() {
    var icon = document.getElementById("hiddenPass");
    document.getElementById("password").setAttribute("type", "password");
    document.getElementById("cpassword").setAttribute("type", "password");
    icon.className = "fa fa-eye fa-lg";
    icon.removeEventListener("click", setPasswordInvisible, false);
    icon.addEventListener("click", setPasswordVisible, false);

}

function clearField() {
    document.getElementById("email").value = "";
    document.getElementById("email").focus();
}

function submitData() {
    validateData();
    if (isFormValid) {
        document.getElementById("formContainer").style.display = "none";
        document.getElementById("registered").style.display = "block";
        var regMsg = document.getElementById("registeredMsg");
        regMsg.innerHTML = "Registration complete! <br />"
        regMsg.innerHTML += "Name: " + fName + " " + lName + "<br />";
        regMsg.innerHTML += "Address: " + address + "<br />";
        regMsg.innerHTML += "City: " + city + "<br />";
        regMsg.innerHTML += "Postal Code: " + postal + "<br />";
        regMsg.innerHTML += "Province: " + province + "<br />";
        regMsg.innerHTML += "Country: " + document.getElementById("country").value + "<br />";
        regMsg.innerHTML += "Age: " + age + "<br />";
        regMsg.innerHTML += "Password: " + pass + "<br />";
        regMsg.innerHTML += "Email: " + email;
    }
}

function clearDoubleSpaces(string) {
    string = string.trim();
    string = string.replace(/\s{1,}/, ' ');
    return string;
}

function validateData() {
    isFormValid = true;
    var userInput = document.getElementsByTagName("input");
    fName = clearDoubleSpaces(userInput[0].value);
    lName = clearDoubleSpaces(userInput[1].value);
    address = clearDoubleSpaces(userInput[2].value);
    city = clearDoubleSpaces(userInput[3].value);
    postal = clearDoubleSpaces(userInput[4].value);
    province = document.getElementById("province").value;
    var born = document.getElementById("born").value;
    pass = userInput[5].value;
    var cpass = userInput[6].value;
    email = clearDoubleSpaces(userInput[7].value);
    age = currentYear - born;
    if (fName == "") {
        errorMessage(0, "Enter first name");
    }
    else if (!nameField.test(fName)) {
        errorMessage(0, "Invalid name entered");
    }  
    else { resetErrors(0); }

    if (lName == "") {
        errorMessage(1, "Enter last name");
    }
    else if (!nameField.test(lName)) {
        errorMessage(1, "Invalid name entered");
    }
    else { resetErrors(1); }

    if (address == "") {
        errorMessage(2, "Enter address");
    }
    else if (!charField.test(address)) {
        errorMessage(2, "Invalid address entered");
    }
    else { resetErrors(2); }

    if (city == "") {
        errorMessage(3, "Enter city");
    }
    else if (!nameField.test(city)) {
        errorMessage(3, "Invalid city entered");
    }
    else { resetErrors(3); }

    if (postal == "") {
        errorMessage(4, "Enter postal code");
    }
    else if (!postalField.test(postal)) {
        errorMessage(4, "Invalid postal code");
    }
    else { resetErrors(4); }

    if (province == "") {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[5].childNodes;
        containerChild[1].style.borderBottom = "3px solid #d10000";
        containerChild[3].className = "errorLabel";
        containerChild[5].innerHTML = "Select province";
        containerChild[5].style.color = "#d10000";     
        isFormValid = false;
    }
    else {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[5].childNodes;
        containerChild[1].style.borderBottom = "1px solid #666666";
        containerChild[3].className = "";
        containerChild[5].innerHTML = "";
        containerChild[5].style.color = "black";
    }

    if (born == "") {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[7].childNodes;
        containerChild[1].style.borderBottom = "3px solid #d10000";
        containerChild[3].className = "errorLabel";
        containerChild[5].innerHTML = "Select year";
        containerChild[5].style.color = "#d10000";
        isFormValid = false;
    }
    else if (age < 18) {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[7].childNodes;
        containerChild[1].style.borderBottom = "3px solid #d10000";
        containerChild[3].className = "errorLabel";
        containerChild[5].innerHTML = "Must be 18+";
        containerChild[5].style.color = "#d10000";
        isFormValid = false;
    }
    else {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[7].childNodes;
        containerChild[1].style.borderBottom = "1px solid #666666";
        containerChild[3].className = "";
        containerChild[5].innerHTML = "";
        containerChild[5].style.color = "black";
    }

    if (pass == "") {
        errorMessage(8, "Enter password");
    }
    else if (!passField.test(pass)) {
        errorMessage(8, "Password must be at least 6 characters with at least a number an upper-case character.");
    }
    else if (cpass == "") {
        resetErrors(8);
        errorMessage(9, "Confirm password");
    }
    else if (pass != cpass) {
        resetErrors(8);
        errorMessage(9, "Passwords do not match");
    }
    else {
        resetErrors(8);
        resetErrors(9);
    }

    if (email == "") {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[10].childNodes;
        containerChild[1].style.borderBottom = "3px solid #d10000";
        containerChild[5].style.display = "none";
        containerChild[7].className = "errorLabel";
        containerChild[9].innerHTML = "Enter email";
        containerChild[9].style.color = "#d10000";
        isFormValid = false;
    }
    else if (!emailField.test(email)) {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[10].childNodes;
        containerChild[1].style.borderBottom = "3px solid #d10000";
        containerChild[5].style.display = "none";
        containerChild[7].className = "errorLabel";
        containerChild[9].innerHTML = "Invalid email";
        containerChild[9].style.color = "#d10000";
        isFormValid = false;
    }
    else {
        var containers = document.getElementsByClassName("inputContainer");
        var containerChild = containers[10].childNodes;
        containerChild[1].style.borderBottom = "1px solid #666666";
        containerChild[5].style.display = "block";
        containerChild[7].className = "";
        containerChild[9].innerHTML = "";
        containerChild[9].style.color = "black";
    }
}

function resizeBanner() {
    var pageWidth = window.innerWidth;
    document.getElementById("banner").style.width = pageWidth;
}

function errorMessage(index, Msg) {
    var containers = document.getElementsByClassName("inputContainer");
    var containerChild = containers[index].childNodes;
    containerChild[1].style.borderBottom = "3px solid #d10000";
    containerChild[3].style.display = "none";
    containerChild[5].className = "errorLabel";
    containerChild[7].innerHTML = Msg;
    containerChild[7].style.color = "#d10000";
    isFormValid = false;
}

function resetErrors(index) {
    var containers = document.getElementsByClassName("inputContainer");
    var containerChild = containers[index].childNodes;
    containerChild[1].style.borderBottom = "1px solid #666666";
    containerChild[3].style.display = "block";
    containerChild[5].className = "";
    containerChild[7].innerHTML = "";
    containerChild[7].style.color = "black";
}

function createEventListeners() {
    createYearBornDropDown();
    //document.getElementById("born").addEventListener("click", displayDropDown, false);
    document.getElementById("hiddenPass").addEventListener("click", setPasswordVisible, false);
    document.getElementById("emailClear").addEventListener("click", clearField, false);
    document.getElementById("submitButton").addEventListener("click", submitData, false);
    //window.addEventListener("resize", resizeBanner, false);
}

function setUpPage() {
    createEventListeners();
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}