const dashboardAddress = './dashboard/index.html';
const apiUrl = 'http://localhost:6969/api/v1'




document.addEventListener('DOMContentLoaded', function () {
document.querySelector("#login").addEventListener("click", function () {
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let data = {
        username: username,
        password: password
    }
let xhr = new XMLHttpRequest();
xhr.open('POST', apiUrl + '/users/login', true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function () {
    if (xhr.status === 200) {
        let sessionId = JSON.parse(xhr.responseText).sessionId
        console.log(xhr.responseText)
        console.log(JSON.parse(xhr.responseText))
        localStorage.setItem('token', sessionId)
        localStorage.setItem('username', username)
        // window.location.href = dashboardAddress
    } else {
        alert('Wrong username or password')
    }
}
console.log(data)
console.log(JSON.stringify(data))
xhr.send(((JSON.stringify(data))));
})
})