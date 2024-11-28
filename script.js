

var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
var submitButton = document.getElementById("submit");
var clearButton = document.getElementById("clear");

var resultContainer;

function validateForm() {
  if (
    age.value == "" ||
    height.value == "" ||
    weight.value == "" ||
    (male.checked == false && female.checked == false)
  ) {
    alert("All fields are required!");
    return false; 
  } else {
    countBmi(); 
    return false; 
  }
}

submitButton.addEventListener("click", validateForm);

function countBmi() {
  var p = [age.value, height.value, weight.value];
  if (male.checked) {
    p.push("male");
  } else if (female.checked) {
    p.push("female");
  }

  var heightInMeters = Number(p[1]) / 100;
  var bmi = Number(p[2]) / (heightInMeters * heightInMeters);

  var healthyWeightLower = 18.5 * heightInMeters * heightInMeters;
  var healthyWeightUpper = 24.9 * heightInMeters * heightInMeters;

  var result = "";
  var color = "";
  var quote = "";
  var weightDifference = "";
  var extraMessage = ""; 

  if (bmi < 18.5) {
    result = "Underweight";
    color = "blue";
    quote = "Nourish your body with a balanced diet to thrive!";
    weightDifference = `You need to gain ${(healthyWeightLower - Number(p[2])).toFixed(2)} kg more to reach a healthy weight.`;
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = "Healthy";
    color = "green";
    extraMessage = "You are healthy, keep it up!"; 
  } else if (25 <= bmi && bmi <= 29.9) {
    result = "Overweight";
    color = "orange";
    quote = "Every small step counts—start your fitness journey today!";
    weightDifference = `You need to lose ${(Number(p[2]) - healthyWeightUpper).toFixed(2)} kg less to reach a healthy weight.`;
  } else if (30 <= bmi && bmi <= 34.9) {
    result = "Obese";
    color = "red";
    quote = "Your health is your wealth—take it one day at a time!";
    weightDifference = `You need to lose ${(Number(p[2]) - healthyWeightUpper).toFixed(2)} kg less to reach a healthy weight.`;
  } else if (35 <= bmi) {
    result = "Extremely obese";
    color = "darkred";
    quote = "Focus on progress, not perfection—begin your transformation!";
    weightDifference = `You need to lose ${(Number(p[2]) - healthyWeightUpper).toFixed(2)} kg less to reach a healthy weight.`;
  }

  if (resultContainer) {
    resultContainer.remove();
  }

  resultContainer = document.createElement("div");
  resultContainer.style.textAlign = "center"; 

  if (extraMessage) {
    var pElement = document.createElement("p");
    pElement.innerText = extraMessage;
    pElement.style.color = "darkgreen";
    pElement.style.fontWeight = "bold";
    pElement.style.fontSize = "1.5em";
    pElement.style.marginTop = "20px";
    resultContainer.appendChild(pElement);
  }

  var h1 = document.createElement("h1");
  h1.style.color = color;
  h1.style.fontWeight = "bold";
  h1.innerText = result;
  resultContainer.appendChild(h1);

  var h2 = document.createElement("h2");
  h2.innerText = `BMI: ${parseFloat(bmi).toFixed(2)}`;
  resultContainer.appendChild(h2);

  if (weightDifference) {
    var weightElement = document.createElement("p");
    weightElement.innerText = weightDifference;
    weightElement.style.color = "darkgreen";
    weightElement.style.fontWeight = "bold";
    weightElement.style.fontSize = "1.3em";
    weightElement.style.marginTop = "15px";
    resultContainer.appendChild(weightElement);
  }

  document.body.appendChild(resultContainer);
}

clearButton.addEventListener("click", function () {
  form.reset();

  if (resultContainer) {
    resultContainer.remove();
  }
});
