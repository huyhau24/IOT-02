const baseURL = "https://github.com/huyhau24/IOT-02/tree/main/api/";

async function loadJSON(file) {
  const res = await fetch(baseURL + file);
  return res.json();
}

function updateTime() {
  loadJSON("date_time.json").then(data => {
    document.getElementById("timeDisplay").textContent = data.time || "No time data";
  });
}

function updateWeather() {
  loadJSON("weather.json").then(data => {
    const { temp, humid, forecast } = data;
    document.getElementById("weatherDisplay").textContent =
      `Temp: ${temp}°C, Hum: ${humid}%, Forecast: ${forecast}`;
  });
}

function updateControl() {
  loadJSON("control.json").then(data => {
    for (let key in data) {
      const btn = document.getElementById(key);
      if (btn) {
        btn.textContent = data[key].toUpperCase();
        btn.style.backgroundColor = data[key] === "on" ? "#28a745" : "#dc3545";
      }
    }
  });
}

function updateSchedule() {
  loadJSON("schedule.json").then(data => {
    document.getElementById("scheduleDisplay").textContent = JSON.stringify(data, null, 2);
  });
}

function toggleDevice(device) {
  // ESP sẽ gửi trạng thái về server nên Web chỉ hiển thị, không thay đổi ở đây
  alert("Send control command via ESP or server logic.");
}

// Gọi các hàm
updateTime();
updateWeather();
updateControl();
updateSchedule();
setInterval(() => {
  updateTime();
  updateWeather();
  updateControl();
}, 5000); // Cập nhật mỗi 5 giây

