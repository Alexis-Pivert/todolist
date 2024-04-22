// *** Extraire l'id depuis l'url
const url = new URLSearchParams(location.search)
const taskId = +url.get("id")



// *** trouver la tache a modifier 
const tasks = JSON.parse(localStorage.getItem("tasks"))

// *** trouver la tache a modifier
const task = tasks.find(t => t.id === taskId)


// *** pré remplire le formulaire de modification avec les données de la tache
const input = document.querySelector("input")
const textarea = document.querySelector("textarea")
input.value = task.title
textarea.innerText = task.content


// *** recuperer le form et ecouter la soumission
const form = document.querySelector("form")

form.addEventListener('submit', (event) => {
    event.preventDefault()
   
    // *** modifier la tache
    task.title = input.value
    task.content = textarea.value


    // *** mettre a jour le localstorage
    localStorage.setItem("tasks", JSON.stringify(tasks))

    localStorage.setItem('success',"la tache à été mise a jour")

    // *** redirection vers la page d'accueil
    location.href = "/"
})

