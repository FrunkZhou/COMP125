// global variables
var genderImp;
var ageImp;
var genderMet;
var ageMet;
var heightInFeet;
var heightInInches;
var weightInStones;
var weightInPounds;
var heightInMeters;
var heightInCentimeters;
var weightInKilograms;
var weightInGrams;
var multiplierImp;
var multiplierMet;	

// selects tab
function openTab(tabName, tabButton) {
	var tabcontents;
	var headertab;
	// removes all contents of every tab
	tabcontents = document.getElementsByClassName("tabcontents");
	for (var i = 0; i < tabcontents.length; ++i) {
		tabcontents[i].style.display = "none";
	}
	// removes active tab header colour
	headertab = document.getElementsByClassName("headertabs");
	for (var i = 0; i < headertab.length; ++i) {
		headertab[i].style.backgroundColor= "";
	}
	// displays selected tab content
	document.getElementById(tabName).style.display = "block";
	// sets active tab colour to dark orange
	tabButton.style.backgroundColor = '#e67300';
}

// return 0 if cannot be parsed
function parseInput(input) {
	var parsed = parseFloat(input);
	if (isNaN(parsed)) { return 0 }
	return parsed;
}

function getUserInput() {
	genderImp = document.getElementById("genderImp").value;
	ageImp = parseInput(document.getElementById("ageImp").value);
	genderMet = document.getElementById("genderMet").value;
	ageMet = parseInput(document.getElementById("ageMet").value);
	heightInFeet = parseInput(document.getElementById("heightinfeet").value);
	heightInInches = parseInput(document.getElementById("heightininches").value);
	weightInStones = parseInput(document.getElementById("weightinstones").value);
	weightInPounds = parseInput(document.getElementById("weightinpounds").value);
	heightInMeters = parseInput(document.getElementById("heightinmeters").value);
	heightInCentimeters = parseInput(document.getElementById("heightincentimeters").value);
	weightInKilograms = parseInput(document.getElementById("weightinkilograms").value);
	weightInGrams = parseInput(document.getElementById("weightingrams").value);
	if (document.getElementById('lvl1Imp').checked) {
		multiplierImp = document.getElementById('lvl1Imp').value;
	}
	else if (document.getElementById('lvl2Imp').checked) {
		multiplierImp = document.getElementById('lvl2Imp').value;
	}
	else if (document.getElementById('lvl3Imp').checked) {
		multiplierImp = document.getElementById('lvl3Imp').value;
	}
	if (document.getElementById('lvl1Met').checked) {
		multiplierMet = document.getElementById('lvl1Met').value;
	}
	else if (document.getElementById('lvl2Met').checked) {
		multiplierMet = document.getElementById('lvl2Met').value;
	}
	else if (document.getElementById('lvl3Met').checked) {
		multiplierMet = document.getElementById('lvl3Met').value;
	}
}

function calculateBMRImperial() {
	getUserInput();
	var bmr;
	var dti;
	heightInInches += (12 * heightInFeet);
	weightInPounds += (14 * weightInStones);
	if (genderImp == "male") {
		//BMR = (10 * 0.453592 lb) + (6.25 * 2.54 in) - (5 * age) + 5
		bmr = ((10 * 0.4536 * weightInPounds) + (6.25 * 2.54 * heightInInches) - (5 * ageImp) + 5);
		dti = Math.round(bmr * multiplierImp);
	}
	else if (genderImp == "female") {
		//BMR = (10 * 0.453592 lb) + (6.25 * 2.54 in) - (5 * age) - 161
		bmr = ((10 * 0.4536 * weightInPounds) + (6.25 * 2.54 * heightInInches) - (5 * ageImp) - 161);
		dti = Math.round(bmr * multiplierImp);
	}
	if (bmr < 0)
	{
		document.getElementById("calctextImp").innerHTML = "Your BMR is negative. Please double check your measurements.";
	}
	else {
	document.getElementById("calctextImp").innerHTML = "Your BMR is <b><font size=\"5\">" + Math.round(bmr) + "</font></b>. You need about <b><font size=\"5\">" + dti + "</font></b> calories each day to maintain your current weight.";
	}
}

function calculateBMRMetric() {
	getUserInput();
	var bmr;
	var dti;
	heightInCentimeters += (100 * heightInMeters);
	weightInKilograms += (0.001 * weightInGrams);
	if (genderMet == "male") {
		//BMR = (10 * kg) + (6.25 * cm) - (5 * age) + 5
		bmr = ((10 * weightInKilograms) + (6.25 * heightInCentimeters) - (5 * ageMet) + 5);
		dti = Math.round(bmr * multiplierMet);
	}
	else if (genderMet == "female") {
		//BMR = (10 * kg) + (6.25 * cm) - (5 * age) - 161
		bmr = ((10 * weightInKilograms) + (6.25 * heightInCentimeters) - (5 * ageMet) - 161);
		dti = Math.round(bmr * multiplierMet);
	}
	// checks for negative bmr or dti values
	if (bmr < 0)
	{
		document.getElementById("calctextMet").innerHTML = "Your BMR is negative. Please double check your measurements.";
	}
	else {
	document.getElementById("calctextMet").innerHTML = "Your BMR is <b><font size=\"5\">" + Math.round(bmr) + "</font></b>. You need about <b><font size=\"5\">" + dti + "</font></b> calories each day to maintain your current weight.";
	} 
}

// checks user enters fields and fields are positive
function checkFieldsImperial() {
	var ageEntered = false;
	var heightEntered = false;
	var weightEntered = false;
	var lvlEntered = false;
	getUserInput();
	//checks for age field
	if (ageImp == 0) 
	{
		document.getElementById("ageErrorImp").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * age is required</font>";
	}
	else if (ageImp < 0)
	{
		document.getElementById("ageErrorImp").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * age must be positive</font>";
	}
	else 
	{
		document.getElementById("ageErrorImp").innerHTML = "";
		ageEntered = true;
	}
	//checks for height fields
	if (heightInFeet == 0 && heightInInches == 0)
	{
		document.getElementById("heightErrorImp").innerHTML = "<font size=\"2\" color=\"black\">* height is required</font>";
	}
	else if (heightInFeet < 0 || heightInInches < 0)
	{
		document.getElementById("heightErrorImp").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * height must be positive</font>";
	}
	else 
	{
		document.getElementById("heightErrorImp").innerHTML = "";
		heightEntered = true;
	}
	//checks for weight fields
	if (weightInStones == 0 && weightInPounds == 0) 
	{
		document.getElementById("weightErrorImp").innerHTML = "<font size=\"2\" color=\"black\">* weight is required</font>";
	}
	else if (weightInStones < 0 || weightInPounds < 0)
	{
		document.getElementById("weightErrorImp").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * weight must be positive</font>";
	}
	else 
	{
		document.getElementById("weightErrorImp").innerHTML = "";
		weightEntered = true;
	}
	if (multiplierImp == undefined) 
	{
		document.getElementById("lvlErrorImp").innerHTML = "&nbsp; &nbsp; &nbsp;<font size=\"2\" color=\"black\">* Please select an activity level.</font>";
	}
	else 
	{
		document.getElementById("lvlErrorImp").innerHTML = "";
		lvlEntered = true;
	}
	if (ageEntered && heightEntered && weightEntered && lvlEntered) { calculateBMRImperial(); }
}

// checks user enters fields and fields are positive for metric tab
function checkFieldsMetric() {
	var ageEntered = false;
	var heightEntered = false;
	var weightEntered = false;
	var lvlEntered = false;
	getUserInput();
	//checks for age field
	if (ageMet == 0) 
	{
		document.getElementById("ageErrorMet").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * age is required</font>";
	}
	else if (ageMet < 0)
	{
		document.getElementById("ageErrorMet").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * age must be positive</font>";
	}
	else 
	{
		document.getElementById("ageErrorMet").innerHTML = "";
		ageEntered = true;
	}
	//checks for height fields
	if (heightInMeters == 0 && heightInCentimeters == 0)
	{
		document.getElementById("heightErrorMet").innerHTML = "<font size=\"2\" color=\"black\">* height is required</font>";
	}
	else if (heightInMeters < 0 || heightInCentimeters < 0)
	{
		document.getElementById("heightErrorMet").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * height must be positive</font>";
	}
	else 
	{
		document.getElementById("heightErrorMet").innerHTML = "";
		heightEntered = true;
	}
	//checks for weight fields
	if (weightInKilograms == 0 && weightInGrams == 0) 
	{
		document.getElementById("weightErrorMet").innerHTML = "<font size=\"2\" color=\"black\">* weight is required</font>";
	}
	else if (weightInKilograms < 0 || weightInGrams < 0)
	{
		document.getElementById("weightErrorMet").innerHTML = "<font size=\"2\" color=\"black\">\&nbsp * weight must be positive</font>";
	}
	else 
	{
		document.getElementById("weightErrorMet").innerHTML = "";
		weightEntered = true;
	}
	if (multiplierMet == undefined) 
	{
		document.getElementById("lvlErrorMet").innerHTML = "&nbsp; &nbsp; &nbsp;<font size=\"2\" color=\"black\">* Please select an activity level.</font>";
	}
	else 
	{
		document.getElementById("lvlErrorMet").innerHTML = "";
		lvlEntered = true;
	}
	if (ageEntered && heightEntered && weightEntered && lvlEntered) { calculateBMRMetric(); }
}

// initially opens imperial tab
document.getElementById("default").click();

document.getElementById("convertImperial").addEventListener("click", checkFieldsImperial, false);
document.getElementById("convertMetric").addEventListener("click", checkFieldsMetric, false);
//document.getElementById("heightininches").addEventListener("change", calculateBMRImperial, false);