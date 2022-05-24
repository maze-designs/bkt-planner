const apiUrl = 'http://localhost:6969/api/v1';
const xhr = new XMLHttpRequest();

const session = {
    sessionid: localStorage.getItem('token'),
    user: localStorage.getItem('username')
}

const getApi = async (path, session, onload) => {
    const req = await fetch(apiUrl + path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'sessionid': session.sessionid,
            'user': session.user
        }
    })

    const response = await req.json()
    if (onload != null) {
        onload(response);
    }
    else {return response};
}

const checkSession = async () => {
    console.log(await getApi('/users/checkSession', session, null))
}
checkSession()