const apiUrl = 'http://localhost:6969/api/v1';

const q = document.querySelector.bind(document)
const dq = (selector1, selector2) => { // dual queryselector
    return document.querySelector(selector1).querySelector(selector2)
}
let records

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
    //TODO: check validity
}

const getRecords = async () => {
    return await getApi('/records', session, null)
}

const drawCalendar = async () => {
    const dayStart = 8
    const dayEnd = 20

    const dayLength = dayEnd - dayStart
    const hourWidthPx = (q(".timeline").clientHeight / dayLength)

    console.log(records)
    today = new Date()

    document.documentElement.style.setProperty('--pattern-size', `${hourWidthPx}px ${hourWidthPx}px`)
    records.forEach(record => {
        const startDate = new Date(record.data.startDate * 1000) //TODO: check if milis
        const endDate = new Date(record.data.endDate * 1000)
        const name = record.data.name

        const startHour = startDate.getHours()
        const startMinutePercent = startDate.getMinutes() / 60
        const endHour = endDate.getHours()
        const endMinutePercent = endDate.getMinutes() / 60
        console.log(startHour, startMinutePercent, endHour, endMinutePercent)
        const top = (startHour + startMinutePercent - dayStart) * hourWidthPx
        const height = ((endHour + endMinutePercent) - (startHour + startMinutePercent)) * hourWidthPx

        let el = document.createElement('div')
        el.className = 'calendar-item'
        el.innerHTML = `<span class="startDate">${startDate.toLocaleTimeString()}</span>`
        el.innerHTML += `<span class="endDate">${endDate.toLocaleTimeString()}</span>`
        el.style.position = 'absolute'
        el.style.top = top + 'px'
        console.log(height)
        el.style.height = height + 'px'
        dq("#day1", ".timeline").appendChild(el) // TODO: get day
    })
}

const drawRibbon = async () => {
    q('#username').innerHTML = session.user // TODO: limit username length
}

document.addEventListener('DOMContentLoaded', async () => {
checkSession()
drawRibbon()
records = await getRecords()
drawCalendar()
})