document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.querySelector('.header #search button');
    myButton.addEventListener('mouseover', function() {
        myButton.style.backgroundColor = '#ECFFC3';
    });
    myButton.addEventListener('mouseout', function() {
        myButton.style.backgroundColor = 'white';
    })

    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        findShow(e.target.search.value)
        form.reset()

        // Clear results on subsequent searches
        const div = document.getElementById('show-list');
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    })
})

function findShow(title) {
    fetch(`https://api.tvmaze.com/search/shows?q=${title}`)
    .then(response => response.json())
    .then(data => {
        let showArray = [];
        for (e in data) {
            showArray.push(data[e].show)
        }
        showResults(showArray);
    })
}

function showResults(arr) {
    arr.forEach(show => {
        // Format show schedule
        console.log(show.schedule.time);
        let showSchedule;
        if (isNaN(show.schedule.time)) {
            convert24to12(show.schedule.time);
            showSchedule = `${show.schedule.days}  ${convertedTime}`
            console.log(showSchedule)
        } else {
            showSchedule = ' ';
        };

        // Add show info to the page
        const node = document.createElement('p');
        node.innerHTML += `
            <aside class = "left small-5"><img src ="${show.image.medium}"></aside>
            <h1>${show.name}</h1>
            <div id = "information">${show.summary}</div>
            <section id="general-info-panel"
                <br>Network: ${show.network.name}
                <br>Status: ${show.status}
                <br>Genres: ${show.genres}
                <br>Schedule: ${showSchedule}
                <br> <a href="${show.officialSite}" target="blank">Official Site</a>
            </section>`;
        document.getElementById("show-list").appendChild(node);
    })
}

function convert24to12 (time) {
    let ampm = "AM";
    let hours = parseInt(time.substr(0,2));
    if (hours > 12) {
        ampm = "PM";
        hours -= 12;
    }
    let mins = time.substr(3,2);
    convertedTime = hours.toString().padStart(2,"0") + ":" + mins+ampm;
    return convertedTime;
}
