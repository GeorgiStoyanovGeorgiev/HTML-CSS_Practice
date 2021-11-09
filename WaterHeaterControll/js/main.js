// -------------------------------------------------------------
const MIN_RANGE_TEMP = 30;
const MAX_RANGE_TEMP = 90;
const DELTA_T_HEATING = .4;
const DELTA_T_COOLING = .1;
const ROOM_TEMP = 25;
const WATTER_TEMP = 30;
const TEMP_TH_1 = 0;
const TEMP_TH_2 = 2;
const TIME_INTERVAL = 1 * 1000;
// -------------------------------------------------------------
let heatingTimer = null;
let coolingTimer = null;
let setPoint;
let power;
let minTemp, maxTemp;
let waterTemperature;
let roomTemperature;
let heatting = false;
let temp;
let state;
let glow;
let checked;
let slider;
let output;
// -------------------------------------------------------------
function measureWaterTemp() {
	return WATTER_TEMP;
}
// -------------------------------------------------------------
function measureRoomTemp() {
	return ROOM_TEMP;
}
// -------------------------------------------------------------

function init() {
	waterTemperature = measureWaterTemp();
	roomTemperature = measureRoomTemp();
	temp = document.getElementById("current-temperature");
	temp.innerHTML = waterTemperature;
	power = document.getElementById("checkbox").value;
	onTempValueChange();
	coolingTimer = setInterval(cooling, TIME_INTERVAL);
}
// -------------------------------------------------------------
function cooling() {
	if (waterTemperature > roomTemperature) {
		temp = document.getElementById("current-temperature");
		temp.innerHTML = Math.round(waterTemperature);
		waterTemperature -= DELTA_T_COOLING;
	}
}
// -------------------------------------------------------------
function heating() {
	updateCurrentTempStyle();
	updateHeaterState();
	temp = document.getElementById("current-temperature");
	temp.innerHTML = Math.round(waterTemperature);
}
// -------------------------------------------------------------
function updateCurrentTempStyle() {
	temp = document.getElementById("current-temperature");
	if (waterTemperature >= minTemp && waterTemperature <= maxTemp) {
		temp.style.color = "rgb(1,143,73)";
	}
	else {
		temp.style.color = "rgb(0,0,0)";
	}
}
// -------------------------------------------------------------
function updateHeaterState() {
	state = document.getElementById("heat-state");
	if (waterTemperature >= maxTemp) {
		heatting = false;
	}
	else if (waterTemperature <= minTemp) {
		heatting = true;
	}
	if (heatting === true) {
		waterTemperature += DELTA_T_HEATING;
		state.innerHTML = "Heating";
	}
	else {
		state.innerHTML = "";
	}
}
// -------------------------------------------------------------
function onTempValueChange() {
	slider = document.getElementById("slider").value;
	setPoint = parseInt(slider);
	maxTemp = setPoint + TEMP_TH_1;
	minTemp = setPoint - TEMP_TH_2;
}
// -------------------------------------------------------------
function onPowerChange() {
	checked = document.getElementById("checkbox");
	glow = document.getElementById("sliderVal");
	temp = document.getElementById("current-temperature");
	state = document.getElementById("heat-state");
	if (checked.checked == true) {
		heatingTimer = setInterval(heating, TIME_INTERVAL);
		glow.style.boxShadow = "0px 0px 5px 1px rgba(0, 207, 243, 0.56)";
	}
	else {
		clearInterval(heatingTimer);
		temp.style.color = "rgb(0,0,0)";
		state.innerHTML = " ";
		glow.style.boxShadow = "none";
	}
}
// -------------------------------------------------------------