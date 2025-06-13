
const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function typeMsg(text) {
    const typer = document.getElementById("typer-text");
    typer.innerText = "";

    for(let i = 0; i < text.length; i++) {
        setTimeout(() => {
            typer.innerText += text[i];
        }, i * 50);
    }
}

function lightdmMode() {
    return this["lightdm"] != undefined;
}

function isLock() {
    return lightdmMode() && lightdm.lock_hint;
}

window.addEventListener("load", () => {
    const form = document.getElementById("login-panel");
    const time = document.getElementById("time");
    const date = document.getElementById("date");

    const sessionSel = document.getElementById("session-select");

    function update() {
        const now = new Date();

        time.innerText = `${now.getHours()}:${now.getMinutes()}`;
        date.innerText = `${now.getDate()} ${MONTHS[now.getMonth()]}, ${DAYS[now.getDay() - 1]}`;
    }

    setInterval(update, 1000);
    update();

    if(isLock()) {
        typeMsg("Please reauthenticate");
    } else {
        typeMsg("Welcome");
    }

    if(lightdmMode()) {
        // Temp fix
        setTimeout(() => {
            document.getElementById("hostname").innerText = "@" + lightdm.hostname;
        
            for(const user of lightdm.users) {
                
            }

            for(const session of lightdm.sessions) {
                const opt = document.createElement("option");
                opt.innerText = session.name;
                sessionSel.append(opt);
            }   
        }, 10);      
    }

    form.onsubmit = (e) => {
        e.preventDefault();
    }
});
