let banTest
function startBanTesting(){
    banTest = setInterval(()=>{
        let error = `<div class="error">9:10:52 PM - Error at login on server</div>`, BANNED;
    try {
    BANNED = document.querySelector("#toasts").childNodes.length == 2
    document.querySelector("#toasts").childNodes[0].outerHTML == error &&
    document.querySelector("#toasts").childNodes[1].outerHTML == error;
    } catch {null;}
    if (BANNED) {
        let banAlert = document.createElement('div');
        banAlert.innerHTML = `<div class="alert-popup" style="opacity: 1;"><div class="popup-outer"></div><div class="wrapper"><div>Due to violating Terms of Service, your account has been banned permanently, if this is an error or a bug, contact us.</div><div id="banAlert" class="close-button">OK</div></div></div>`;
        document.body.appendChild(banAlert);
        document.getElementById('banAlert').onclick = ()=>{banAlert.remove(); startBanTesting();};
        stopBanTesting();
    }
    }, 1000);
}

function stopBanTesting(){
    clearInterval(banTest);
}

startBanTesting();
