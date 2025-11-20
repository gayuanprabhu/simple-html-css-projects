
    const clock = document.getElementById("clock");
    const alarmTimeInput = document.getElementById("alarmTime");
    const setAlarmBtn = document.getElementById("setAlarm");
    const toggleDark = document.getElementById("toggleDark");
    const alarmSound = document.getElementById("alarmSound");

    let alarmTime = null;

    function updateClock() {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", { hour12: false });
      clock.textContent = timeString;

      if (alarmTime && timeString === alarmTime + ":00") {
        alarmSound.play();
        alert("⏰ Alarm Ringing!");
      }
    }

    setAlarmBtn.addEventListener("click", () => {
      alarmTime = alarmTimeInput.value;
      if (alarmTime) alert(`✅ Alarm set for ${alarmTime}`);
    });

    toggleDark.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });

    setInterval(updateClock, 1000);
  