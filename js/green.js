
function getRequest(idInstance, apiTokenInstance, command) {
    fetch(`https://4100.api.green-api.com/waInstance${idInstance}/${command}/${apiTokenInstance}`)
    .then(resp => resp.json())
    .then(data => result.value = JSON.stringify(data, null, 2))
    .catch(err => {
        result.value = err;
    });
}

function sendMessage(idInstance, apiTokenInstance, chatId, message) {
    fetch(`https://4100.api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "chatId": chatId,
            "message": message
        }),
    })
    .then(resp => resp.json())
    .then(data => result.value = JSON.stringify(data, null, 2))
    .catch(err => {
        result.value = err;
    });
}

function getFileNameFromUrl(href) {
    const url = new URL(href);
    const path = url.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

function sendFileByUrl(idInstance, apiTokenInstance, chatId, urlFile) {
    fetch(`https://4100.api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "chatId": chatId,
            "urlFile": urlFile,
            "fileName": getFileNameFromUrl(urlFile)
        }),
    })
    .then(resp => resp.json())
    .then(data => result.value = JSON.stringify(data, null, 2))
    .catch(err => {
        result.value = err;
    });
}

window.addEventListener('load', function() {
    const result = document.getElementById('result');
    const idNumber = document.getElementById('idNumber');
    const apiToken = document.getElementById('apiToken');
    const chatId1 = document.getElementById('chatId1');
    const msgInput = document.getElementById('message');
    const chatId2 = document.getElementById('chatId2');
    const fileUrl = document.getElementById('urlFile');
    // get requests
    document.querySelectorAll('button.get').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const idInstance = idNumber.value;
            const apiTokenInstance = apiToken.value;
            const command = event.target.id;
            getRequest(idInstance, apiTokenInstance, command);
        });
    });
    // post requests
    document.querySelectorAll('button.post').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const idInstance = idNumber.value;
            const apiTokenInstance = apiToken.value;
            const command = event.target.id;
            const urlFile = fileUrl.value;
            switch (command) {
                case 'sendMessage': 
                    sendMessage(idInstance, apiTokenInstance, chatId1.value, msgInput.value); 
                    break;
                case 'sendFileByUrl':
                    sendFileByUrl(idInstance, apiTokenInstance, chatId2.value, urlFile)
                    break;
            }
        });
    });
});