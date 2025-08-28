
const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

function getTyper() {
    return document.getElementById("typer-text");
}

function typeMsg(text) {
    const typer = getTyper()
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

function pad(n) {
    return String(n).padStart(2, "0")
}

window.addEventListener("load", () => {
    const form = document.getElementById("login-panel");
    const time = document.getElementById("time");
    const date = document.getElementById("date");

    const sessionSel = document.getElementById("session-select");
    const userSel = document.getElementById("user-select");
    
    const controls = document.getElementById("controls");

    function addControl(icon, alt, callback) {
        const img = document.createElement("img");
        img.src = "./assets/img/" + icon;
        img.alt = alt;

        img.addEventListener("click", () => {
            callback();
        });

        controls.append(img);
    }

    function update() {
        const now = new Date();

        time.innerText = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
        date.innerText = `${now.getDate()} ${MONTHS[now.getMonth()]}, ${DAYS[now.getDay()]}`;
    }

    addControl("power.svg", "Shut down", () => {
        
    });
    addControl("restart.svg", "Restart", () => {

    });
    addControl("hibernate.svg", "Hibernate", () => {

    });

    setInterval(update, 1000);
    
    update();

    setTimeout(() => {
        if(isLock()) {
            typeMsg("Please reauthenticate");
        } else {
            typeMsg("Welcome");
        }
    }, 500);

    if(lightdmMode()) {
        // Temp fix
        setTimeout(() => {
            document.getElementById("hostname").innerText = "@" + lightdm.hostname;
        
            if(!lightdm.hide_users) {
                for(const user of lightdm.users) {
                    const opt = document.createElement("option");
                    opt.innerText = user.name;
                    userSel.append(opt);
                }
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

    getTyper().innerText = "";
});
