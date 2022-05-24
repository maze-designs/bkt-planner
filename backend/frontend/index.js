"use strict";
const apiUrl = 'http://localhost:6969/api/v1';
const xhr = new XMLHttpRequest();

const getApi = async (path, onload, session) => {
    xhr.open('GET', apiUrl + path, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(session);
    xhr.onload = () => {
        if (onload != null) {
            onload(JSON.parse(xhr.responseText));
        }
    };
};
// necha se extendnout funkci vubec?
// function forEachEntry(obj: Object) extends Object<any> {
//     Object.entries(obj).forEach(entry => {
//         const [key, value] = entry
//         console.log(key, value)
//       })
// }
getApi('/sampledata');
