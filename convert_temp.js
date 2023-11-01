"use strict";
const $ = selector => document.querySelector(selector);

/*********************
*  helper functions  *
**********************/
const calculateCelsius = temp => (temp-32) * 5/9;
const calculateFahrenheit = temp => temp * 9/5 + 32;

const toggleDisplay = (label1Text, label2Text) => {
	const labelF = $("#degree_label_1");
    const labelC = $("#degree_label_2");

	labelF.textContent = label1Text;
    labelC.textContent = label2Text;

	

	$("#degrees_entered").value = "";
	$("#degrees_computed").value = "";
	$("#degrees_entered").focus();
}

/****************************
*  event handler functions  *
*****************************/
const convertTemp = () => {
	const inputTemp = parseFloat($("#degrees_entered").value);
	const messageDiv = $("#message");
  
	if (isNaN(inputTemp)) {
	  if (!messageDiv) {
		const newDiv = document.createElement("div");
		newDiv.setAttribute('id', 'message');
		newDiv.setAttribute('style', 'color:red');
  
		const newContent = document.createTextNode("You must enter a valid number for degrees.");
  
		newDiv.appendChild(newContent);
  
		const currentDiv = $("convert");
		document.body.insertBefore(newDiv, currentDiv);
	  }
	  $("#degrees_entered").value = "";
	} else {
	  // Clear the message and update the temperature
	  if (messageDiv) {
		messageDiv.remove();
	  }
  
	  const convertedTemp = $("#to_celsius").checked ? calculateCelsius(inputTemp) : calculateFahrenheit(inputTemp);
	  $("#degrees_computed").value = convertedTemp.toFixed(0);
	}
	$("#degrees_entered").focus();
  };


const toCelsius = () => toggleDisplay("Enter F degrees:", "Degrees Celsius:");
const toFahrenheit = () => toggleDisplay("Enter C degrees:", "Degrees Fahrenheit:");

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#convert").addEventListener("click", convertTemp);
    $("#to_celsius").addEventListener("click", toCelsius);
    $("#to_fahrenheit").addEventListener("click", toFahrenheit);
	
	// move focus
	$("#degrees_entered").focus();
});