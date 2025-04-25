// main vari 

let theInput , getButton , reposData 
theInput = document.querySelector(".get-repos input");
getButton = document.querySelector(".get-button");
reposData = document.querySelector(".show-data");

//get repos func 
getButton.addEventListener("click",getRepos)

function getRepos()
{
    if(theInput.value == "asdfs"){
    reposData.innerHTML = "<span>Please Write Github username."
    console.log("function get repos")
    }
    else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((res) => {
            return res.json()
        })
        .then((repos) => {
            reposData.innerHTML = ""
            // Loop On Repositories
            repos.forEach(element => {
                console.log(element.name)

// Create The Main Div Element
let main = document.createElement("div")
// Create Repo Name Text
let text = document.createTextNode(element.name)
// Append The Text To Main Div
main.appendChild(text)
// Create Repo URL Anchor
let link = document.createElement("a")
// Create Repo Url Text
let x = document.createTextNode(`link`)
// Append The Repo Url Text To Anchor Tag
link.appendChild(x)
// Add Thje Hypertext Reference "href"
link.href = `https://github.com/${theInput.value}/${element.name}`
// Set Attribute Blank
link.setAttribute("target","_blank")
// Append Url Anchor To Main Div
main.appendChild(link);
// Create Stars Count Span
let Starsspan = document.createElement("span")
// Create The Stars Count Text
let stars = document.createTextNode(` stars ${element.stargazers_count}`)
// Add Stars Count Text To Stars Span
Starsspan.appendChild(stars)
// Append Stars Count Span To Main Div
main.appendChild(Starsspan)
// Add Class On Main Div
main.className = 'repo-box'
// Append The Main Div To Container
reposData.appendChild(main);

            });

        })
    }
}