function changeTheme() {
    var element = document.body;
    element.classList.toggle("light-mode");

    const scrollbar = document.documentElement.style;

    if (element.classList.contains("light-mode")) {
        // light mode
        scrollbar.setProperty('--scrollbar-bg-color', '#f8f9fa');
        scrollbar.setProperty('--scrollbar-thumb-color', 'silver');
        scrollbar.setProperty('--scrollbar-thumb-hover-color', '#aaa')
        scrollbar.setProperty('---scrollbar-track-border-color', '#e8e8e8')
    } else {
        // dark mode
        scrollbar.setProperty('--scrollbar-bg-color', '');
        scrollbar.setProperty('--scrollbar-thumb-color', '');
        scrollbar.setProperty('--scrollbar-thumb-hover-color', '')
        scrollbar.setProperty('---scrollbar-track-border-color', '')
    }

    // Save the user's preference to local storage
    var userPref = element.classList.contains("light-mode") ? 'light' : 'dark';
    localStorage.setItem('userPref', userPref);

    var card = document.getElementsByClassName("card");
    for (var i = 0; i < card.length; i++) {
        card[i].classList.toggle("card-light");
    }

    var navbar = document.getElementsByClassName("navbar");
    for (var i = 0; i < navbar.length; i++) {
        navbar[i].classList.toggle("navbar-light");
    }

    var navItem = document.getElementsByClassName("nav-item");
    for (var i = 0; i < navItem.length; i++) {
        navItem[i].classList.toggle("nav-item-light");
    }


    var button = document.getElementsByClassName("buttonStyle");
    for (var i = 0; i < button.length; i++) {
        button[i].classList.toggle("buttonStyle-light");
    }


    var sun = document.getElementById("sun-icon");
    var moon = document.getElementById("moon-icon");
    const hidden = "hidden";
    const display = "display";

    if (sun.classList.contains('hidden')) {
        // img1 is hidden
        // displaying
        sun.classList.add(display);
        sun.classList.remove(hidden);
        // hiding
        moon.classList.add(hidden);
        moon.classList.remove(display);
    } else {
        // img2 is hidden
        // displaying
        moon.classList.add(display);
        moon.classList.remove(hidden);
        // hiding
        sun.classList.add(hidden);
        sun.classList.remove(display);
    }

    var batteryBtn = document.getElementById("battery-button");
    batteryBtn.classList.toggle("battrybuttonStyle-light");




}

function toggleFullArticle() {
    const card = document.querySelector('.card');
    const fullArticle = document.querySelector('#full-article');
    if (fullArticle.classList.contains('hidden')) {
        fullArticle.classList.remove('hidden');
        card.classList.add('card-full');
    } else {
        fullArticle.classList.add('hidden');
        card.classList.remove('card-full');
    }
}


function toggleTextMode() {
    const body = document.body;
    const card = document.querySelectorAll('.card');
    const button = document.querySelectorAll('.buttonStyle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const logo = document.getElementsByClassName('logo');

    var img = document.getElementsByTagName("img");

    // Remove images
    for (var i = 0; i < img.length; i++) {
        if (img[i].style.display != "none") {
            img[i].style.display = "none";
        } else {
            img[i].style.display = "block";
        }

        // img[i].style.display = "none";
    }


    if (document.getElementById('text-mode-button').innerHTML === 'Toggle Full Mode') {
        document.getElementById('text-mode-button').innerHTML = 'Toggle Text Mode';
    } else {
        document.getElementById('text-mode-button').innerHTML = 'Toggle Full Mode';
    }

    const textMode = 'text-mode';
    const textModeCard = 'text-mode-card';


    /* logo */
    if (logo[0].style.display != "none") {
        logo[0].style.display = "none";
    }
    else {
        logo[0].style.display = "block";
    }

    if (body.classList.contains(textMode)) {
        body.classList.remove(textMode);
        card.forEach((c) => c.classList.remove(textModeCard));
        button.forEach((b) => b.classList.remove('no-transition'));
        sunIcon.classList.remove('no-transition');
        moonIcon.classList.remove('no-transition');
    } else {
        body.classList.add(textMode);
        card.forEach((c) => c.classList.add(textModeCard));
        button.forEach((b) => b.classList.add('no-transition'));
        sunIcon.classList.add('no-transition');
        moonIcon.classList.add('no-transition');
    }


}


function manualBatterySaver() {
    if ('getBattery' in navigator) {
        const body = document.body;
        let batteryLevel = null;

        function checkBatteryLevel() {
            navigator.getBattery().then(function (battery) {
                batteryLevel = battery.level;

                if (!body.classList.contains('battery-optimized')) {
                    body.classList.add('battery-optimized');
                    toggleTextMode();
                } else {
                    body.classList.remove('battery-optimized');
                    toggleTextMode();
                }
            });
        }

        checkBatteryLevel();

    }
    else {
        // Battery Status API is not supported
        console.log('Battery Status API is not supported');
        alert('Battery Status API is not supported in your browser :(');
    }
}


function autoBatterySaver() {
    if ('getBattery' in navigator) {
        const textModeButton = document.getElementById('text-mode-button');
        const body = document.body;
        let batteryLevel = null;
        const BATTERY_THRESHOLD = 0.10; // Set the battery level threshold

        function checkBatteryLevel() {
            navigator.getBattery().then(function (battery) {
                batteryLevel = battery.level;
                if (batteryLevel <= BATTERY_THRESHOLD) {
                    if (!body.classList.contains('battery-optimized')) {
                        body.classList.add('battery-optimized');
                        toggleTextMode();
                    }
                } else {
                    if (body.classList.contains('battery-optimized')) {
                        body.classList.remove('battery-optimized');
                        toggleTextMode();
                    }
                }
            });
        }

        // Check the battery level immediately
        checkBatteryLevel();

        // Check the battery level every 60 seconds
        setInterval(checkBatteryLevel, 60000);

        // Add an event listener to detect changes in the battery level
        navigator.getBattery().then(function (battery) {
            battery.addEventListener('levelchange', checkBatteryLevel);
        });

        // Fix edge case where text mode button state is not updated when battery level changes while in text mode
        textModeButton.addEventListener('click', function () {
            setTimeout(function () {
                if (batteryLevel <= BATTERY_THRESHOLD && !body.classList.contains('battery-optimized')) {
                    body.classList.add('battery-optimized');
                    toggleTextMode();
                } else if (batteryLevel > BATTERY_THRESHOLD && body.classList.contains('battery-optimized')) {
                    body.classList.remove('battery-optimized');
                    toggleTextMode();
                }
            }, 0);
        });
    } else {
        // Battery Status API is not supported
        console.log('Battery Status API is not supported');
        alert('Battery Status API is not supported in your browser :(');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    autoBatterySaver();
});