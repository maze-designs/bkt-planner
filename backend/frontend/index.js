"use strict";
const apiUrl = 'http://localhost:6969/api/v1';
const xhr = new XMLHttpRequest();
/* fetch se nelibej cross-origin requesty bez nejakejch picovin takze takhle:
getApi('/sampledata', console.log)

getApi('/sampledata', function(req) { console.log(req) })

getApi('/users', (users) => {
    console.log(users)
})
*/
const getApi = async (path, onload) => {
    xhr.open('GET', apiUrl + path, true);
    xhr.send();
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
