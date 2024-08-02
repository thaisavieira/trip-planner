const formatter = (date) => {
    return {
        day: {
            numeric: dayjs(date).format('DD'),
            week: {
                short: dayjs(date).format('ddd'),
                long: dayjs(date).format('dddd'),
            }
        },
        month: dayjs(date).format('MMMM'),
        hour: dayjs(date).format('HH:mm')
    }
}


const activity = {
    name: 'Feeding cats',
    date: new Date("2024-07-08 06:00"),
    finished: false,
}

let activities = [
    activity,
    {
        name: 'Taking a walk',
        date: new Date("2024-07-09 10:00"),
        finished: false
    },
    {
        name: 'Watch cats take over the world',
        date: new Date("2024-07-09 15:00"),
        finished: false
    },
]


const createActivityItem = (activity) => {

    let input = `
    <input 
    onchange = "concludeActivity(event)"
    value="${activity.date}"
    type="checkbox" 
    `

    if (activity.finished) {
        input += 'checked'
    }

    input += '>'

    const format = formatter(activity.date)


    return `
    <div class='card-bg'>
        ${input}
        <div>
        <svg class = "active" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.50008 8.99999L8.16675 10.6667L11.5001 7.33332M17.3334 8.99999C17.3334 13.6024 13.6025 17.3333 9.00008 17.3333C4.39771 17.3333 0.666748 13.6024 0.666748 8.99999C0.666748 4.39762 4.39771 0.666656 9.00008 0.666656C13.6025 0.666656 17.3334 4.39762 17.3334 8.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg class = "inactive" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41664 0.818364C8.46249 0.615965 9.53745 0.615965 10.5833 0.818364M10.5833 17.1817C9.53745 17.3841 8.46249 17.3841 7.41664 17.1817M13.6741 2.10086C14.5587 2.70022 15.3197 3.46409 15.9158 4.35086M0.818303 10.5834C0.615904 9.53751 0.615904 8.46255 0.818303 7.4167M15.8991 13.6742C15.2998 14.5588 14.5359 15.3198 13.6491 15.9159M17.1816 7.4167C17.384 8.46255 17.384 9.53751 17.1816 10.5834M2.1008 4.32586C2.70016 3.44131 3.46403 2.68026 4.3508 2.0842M4.3258 15.8992C3.44124 15.2998 2.6802 14.536 2.08414 13.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


        <span>${activity.name}</span>
        </div>
        

        <time class='short'>
        ${format.day.week.short},
        ${format.day.numeric} <br>
        ${format.hour}
        </time>

        <time class='full'>
        ${format.day.week.long},
        ${format.month}
        ${format.day.numeric},
        at ${format.hour}h
        </time>
    </div>
    `
}

const updateActivityList = () => {
    const section = document.querySelector('section');
    section.innerHTML = ''

    //check if my list is empty:
    if (activities.length == 0) {
        section.innerHTML = `<p>No activities registered</p>`
        return
    }

    for (let activity of activities) {
        section.innerHTML += createActivityItem(activity)
    }

}

updateActivityList()

const saveActivity = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const name = formData.get('activity')
    const day = formData.get('day')
    const hour = formData.get('hour')
    const date = `${day} ${hour}`

    const newActivity = {
        name,
        date,
        finished: false
    }

    const doesTheActivityExist = activities.find((activity) => {
        return activity.date == newActivity.date //if true activity exists
    })

    if (doesTheActivityExist) {
        return alert('Day/time not available')
    }

    activities = [newActivity, ...activities]
    updateActivityList()


}


const createSelectionDays = () => {
    const days = [
        "2024-07-06",
        "2024-07-07",
        "2024-07-13",
        "2024-07-14",
        "2024-07-20",
        "2024-07-21",
        "2024-07-27",
        "2024-07-28"
    ]

    let daysSelection = ''

    for (let day of days) {
        const format = formatter(day)
        const displayFormattedDay = `
        ${format.month},
        ${format.day.numeric}
        `

        daysSelection += `
        <option value="${day}">${displayFormattedDay}</option>
        `
    }

    document.querySelector('select[name="day"]')
        .innerHTML = daysSelection
}
createSelectionDays()

const createSelectionHours = () => {
    let hoursAvailable = ''

    for (let i = 11; i < 19; i++) {
        hoursAvailable += `<option value="${i}:00">${i}:00</option>`
        hoursAvailable += `<option value="${i}:30">${i}:30</option>`
    }

    document.querySelector('select[name=hour]').innerHTML = hoursAvailable
}
createSelectionHours()

const concludeActivity = (event) => {
    const input = event.target
    const inputDate = input.value

    const activity = activities.find((activity) => {
        return activity.date == inputDate
    })

    if (!activity) {
        return
    }

    activity.finished = !activity.finished
}
