const formatter = (date) => {
    //console.log(dayjs(date).format('dddd'))
    //formatter(new Date('2024-04-01'))

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
    finished:true,
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
        finished:true
    },
]

//activities = []

const createActivityItem = (activity) => {

    let input ='<input type="checkbox" '

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

