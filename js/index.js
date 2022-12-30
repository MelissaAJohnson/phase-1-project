document.addEventListener('DOMContentLoaded', () => {
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
        for (let i = 0; i < data.length; i++) {
            // Create friendly names for each show attribute
            showName = data[i].show.name;
            showSummary = data[i].show.summary;
            showIcon = data[i].show.image.medium;
            showUrl = data[i].show.officialSite;
            showNetwork = data[i].show.network.name;
            showScheduleDays = data[i].show.schedule.days
            showScheduleTime = convert24to12(data[i].show.schedule.time)
            showStatus = data[i].show.status;
            showGenres = data[i].show.genres;

            showSchedule = `${showScheduleDays}  ${showScheduleTime}`;

            function convert24to12 (time) {
                let ampm = "AM";
                let hours = parseInt(time.substr(0,2));
                if (hours > 12) {
                    ampm = "PM";
                    hours -= 12;
                }
                let mins = time.substr(3,2);
                return hours.toString().padStart(2,"0") + ":" + mins+ampm;
            }
    
            // Add show info to the page
            const node = document.createElement('p');
            node.innerHTML += `
                <aside class = "left small-5"><img src ="${showIcon}"></aside>
                <h1>${showName}</h1>
                <div id = "information">${showSummary}</div>
                <section id="general-info-panel"
                    <br>Network: ${showNetwork}
                    <br>Status: ${showStatus}
                    <br>Genres: ${showGenres}
                    <br>Schedule: ${showSchedule}
                    <br> <a href="${showUrl}" target="blank">Official Site</a>
                </section>`;
            document.getElementById("show-list").appendChild(node);
        }
    })

    setTimeout(function() {
        // When we wrote the search results, we added a class to each result. This allowed us to create an object that contained all results.
        const showList = document.querySelectorAll('span.showInfo')
        for (let x = 0; x < showList.length; x++) {
            showList[x].addEventListener("click", function() {
                fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
                .then(response => response.json())
                .then(repoResponse => {
                    for (y = 0; y < repoResponse.length; y++) {
                        let rNode = document.createElement('p')
                        rNode.innerHTML += `${repoResponse[y].name}`
                    }
                })
            })
        }
    }, 1000)
}