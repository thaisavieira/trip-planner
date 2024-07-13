const formatter = (date) => {
    return{
        day:{
            numeric: dayjs(date).format('DD'),
            week:{
                short: dayjs(date).format('ddd'),
                long: dayjs(date).format('dddd'),
            }
        },
        month:dayjs(date).format('MMMM'),
        hour: dayjs(date).format('HH:mm')
    }
}
    

const activity = {
    name:'Feeding cats',
    date:new Date("2024-07-08 06:00"),
    finished:false,
}

let activities = [
    activity,
    {
        name:'Taking a walk to meet neighborhood cats',
        date: new Date("2024-07-09 10:00"),
        finished:false
    },
    {
        name:'Watch cats take over the world',
        date: new Date("2024-07-09 15:00"),
        finished:false
    },
]


const createActivityItem = (activity) => {

    let input =`
    <input 
    onchange = "concludeActivity(event)"
    value="${activity.date}"
    type="checkbox" 
    `

    if(activity.finished){
        input += 'checked'
    }

    input += '>'

    const format = formatter(activity.date)


    return `
    <div>
        ${input}
        <span>${activity.name}</span>
        <time>
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
    section.innerHTML=''

//check if my list is empty:
if(activities.length == 0){
    section.innerHTML=`<p>No activities registered</p>`
    return
}

for(let activity of activities){
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
        finished:false
    }

    const doesTheActivityExist = activities.find((activity)=>{
        return activity.date == newActivity.date //if true activity exists
    })

    if(doesTheActivityExist){
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

    let daysSelection =''

    for(let day of days){
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

    for(let i = 11; i<19;i++){
        hoursAvailable += `<option value="${i}:00">${i}:00</option>`
        hoursAvailable += `<option value="${i}:30">${i}:30</option>`
    }

    document.querySelector('select[name=hour]').innerHTML = hoursAvailable
}
createSelectionHours()

const concludeActivity = (event) => {
    const input = event.target
    const inputDate = input.value

    const activity = activities.find((activity) => 
    {
        return activity.date == inputDate
    })

    if(!activity){
        return
    }

    activity.finished = !activity.finished
}
