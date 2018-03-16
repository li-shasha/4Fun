/**
 * Created by sli on 10/27/2017.
 */

var hour = document.getElementsByClassName("hour")[0],
    minute= document.getElementsByClassName("minute")[0],
    second = document.getElementsByClassName("second")[0];


function updateClock() {
    var now = new Date(),
        secondDeg = now.getSeconds() * (360 / 60),
        minuteDeg = now.getMinutes() * (360 / 60) +secondDeg/60,
        hourDeg = (now.getHours()%12) * (360 / 12) + 3 *(360 / 12) +minuteDeg /12;

    hour.style.transform = "rotate(" + hourDeg+"deg)";
    minute.style.transform = "rotate(" + minuteDeg+"deg)";
    second.style.transform = "rotate(" + secondDeg+"deg)";
}


(function() {
    setInterval(function() {
        updateClock();
    }, 1000);
})();

