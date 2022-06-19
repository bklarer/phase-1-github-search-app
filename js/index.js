document.addEventListener("DOMContentLoaded", () => {
    fetchResults()
})

function fetchResults() {
    const gitForm = document.querySelector ('#github-form')
    gitForm.addEventListener('submit', function (event) {
        event.preventDefault()
        const input= event.target[0].value

        fetch(`https://api.github.com/search/users?q=${input}`)
        .then(resp => resp.json())
        .then(data => {
            document.querySelector("#user-list").innerHTML = " "
            let users = data.items;
            users.forEach(user => searchResults(user))
        })
    })
}

function searchResults (user) {
    const userList = document.querySelector('#user-list');
    const userName = document.createElement('li');
        userName.className = "user-name"
        userName.textContent = `Github Profile: ${user.login}`  
    const userLink = document.createElement('a')
        userLink.addEventListener("click", () => window.open(`${user.html_url}`, "_blank"))
        userLink.textContent = "Profile Link" //should change position
        userLink.style.color = "blue"
    const userSection = document.createElement('div')
    const avatar = document.createElement('img')
        avatar.className = 'user-avatar'
        avatar.src = `${user.avatar_url}`


    userSection.append(avatar, userLink)
    userName.appendChild(userSection)
    userList.appendChild(userName)

    

    avatar.addEventListener("click", function () {
        let userId = userName.textContent.split('Profile')[0]; //should have a scroll box for repos
        fetch(`https://api.github.com/users/${userId}/repos`)
        .then(resp => resp.json())
        .then(function (data) {
            const listRepo = document.querySelector("#repos-list")
            listRepo.innerHTML = " "
            data.forEach(function(repo) { 

                const repoList = document.querySelector("#repos-list");
                const repoName = document.createElement("li");
                    repoName.classname = "repo-name"
                    repoName.textContent = `Respository Name: ${repo.name}`
                const repoProfile = document.createElement("div")
                const repoOwner = document.createElement("p")
                    repoOwner.textContent = `Owner: ${repo.owner.login}`
                const repoLink = document.createElement("a")
                    repoLink.addEventListener("click", () => window.open(`${repo.html_url}`, "_blank"))
                    repoLink.textContent = `${repo.html_url}`
                    repoLink.style.color = "blue"


            repoProfile.append(repoOwner, repoLink)
            repoName.appendChild(repoProfile)
            repoList.appendChild(repoName)
                
            })
        })
        .catch(error => console.log(error))
    })

};