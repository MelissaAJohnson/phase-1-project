document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        findShow(e.target.search.value)
        form.reset()
    })
})

function findShow(name) {
    fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
    .then(response => response.json())
    .then(data => {
        //Promise returns an object containing items. Items are an array. This makes it easier to get to the array. 
        for (let i = 0; i < data.length; i++) {
            // Create friendly names for each user attribute
            showName = data[i].show.name;
            showSummary = data[i].show.summary;
            showIcon = data[i].show.image.medium;
            showUrl = data[i].show.officialSite;
            showNetwork = data[i].show.network.name;
            showSchedule = `${data[i].show.schedule.days}  ${data[i].show.schedule.time}`;
            showStatus = data[i].show.status;
            showGenres = data[i].show.genres;
    
            // Add user info to the page
            const node = document.createElement("p");
            node.innerHTML += `
                <img src ="${showIcon}" style="width:200px"><br>
                <span id = "${showName}" class = "userInfo" style = "cursor:pointer">
                    ${showName} 
                </span>
                <br>${showSummary}
                <br>Network: ${showNetwork}
                <br>Status: ${showStatus}
                <br>Genres: ${showGenres}
                <br>Schedule: ${showSchedule}
                <br> <a href="${showUrl}">Official Site</a>`;
            document.getElementById("show-list").appendChild(node);
        }
    })

    setTimeout(function() {
        // When we wrote the search results, we added a class to each result. This allowed us to create an object that contained all results.
        const showList = document.querySelectorAll('span.showInfo')
        for (let x = 0; x < showList.length; x++) {
            showList[x].addEventListener("click", function() {
                // showList[x] returned the show name with a bunch of spaces so I needed to remove the spaces
                clickedName = showList[x].innerHTML.replace(/\s+/g, '')
                fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
                .then(response => response.json())
                .then(repoResponse => {
                    for (y = 0; y < repoResponse.length; y++) {
                        let rNode = document.createElement('p')
                        rNode.innerHTML += `${repoResponse[y].name}`
                        // We added the user name as an ID so we could target the repository listing to be below that user
                        document.getElementById(`${clickedName}`).appendChild(rNode);
                    }
                })
            })
        }
    }, 1000)
}