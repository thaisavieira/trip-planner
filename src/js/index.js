const activity = {
    name:'Feeding cats',
    date:new Date("2024-07-08 06:00"),
    finished:true,
}

const activities = [
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

const createActivityItem = (activity) => {

    let input ='<input type="checkbox" '

    if(activity.finished){
        input += 'checked'
    }

    input += '>'

    return `
    <div>
        ${input}
        <span>${activity.name}</span>
        <time>${activity.date}</time>
    </div>
    `
}

const section = document.querySelector('section');

for(let activity of activities){
    section.innerHTML += createActivityItem(activity)
}

