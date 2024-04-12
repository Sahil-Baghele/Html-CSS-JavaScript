function calculate() {
  var amount = document.getElementById("amount");
  var ir = document.getElementById("ir");
  var years = document.getElementById("years");
  var emi = document.getElementById("emi");
  var totalinterest = document.getElementById("totalinterest");

  var principal = parseFloat(amount.value);
  var interest = parseFloat(ir.value) / 100 / 12;
  var payments = parseFloat(years.value) * 12;

  var x = Math.pow(1 + interest, payments); //Math.pow computes powers
  var monthly = (principal * x * interest) / (x - 1);

  if (isFinite(monthly)) {
    emi.innerHTML = monthly.toFixed(2);
    totalinterest.innerHTML = (monthly * payments - principal).toFixed(2);
  } else {
    payment.innerHTML = ""; // Erase the content of these elements
    totalinterest.innerHTML = "";
  }
}
