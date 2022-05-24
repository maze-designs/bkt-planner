const apiUrl = 'http://localhost:6969/api/v1';
const xhr = new XMLHttpRequest();

const session = JSON.stringify({
    sessionId: localStorage.getItem('token'),
    user: localStorage.getItem('username')
})

const getApi = async (path, session, onload) => {
    xhr.open('GET', apiUrl + path, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(session);
    xhr.onload = () => {
        if (onload != null) {
            onload(JSON.parse(xhr.responseText));
        }
        else {return JSON.parse(xhr.responseText)};
    };
};

const checkSession = async () => {
    console.log(await getApi('/users/checkSession', session, null))
}
checkSession()