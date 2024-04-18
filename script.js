// Sélection des éléments du formulaire HTML
const form = document.querySelector("form");
const input = document.querySelector("input");
const texteArea = document.querySelector("textarea");

// Initialisation de la liste des tâches à partir du stockage local, ou une liste vide si aucune n'existe
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
displayTask(tasks)
// Notification de succès
notify("success");

// Gestion de la soumission du formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Création d'un objet représentant la tâche à partir des données du formulaire
    const task = {
        id: tasks.length + 1,
        title: input.value,
        content: texteArea.value,
        date: new Date().toUTCString(),
        done: false
    };
    
    // Ajout de la tâche à la liste des tâches
    tasks.push(task);
    // Stockage de la liste mise à jour dans le stockage local
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Affichage des tâches
    displayTask(tasks);
});

// Affichage des tâches
function displayTask(tasks) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    tasks.forEach((task) => {
        // Construction de l'affichage de chaque tâche
        main.innerHTML += `
            <div class="task ${task.done ? "done" : ""}">
                <h2>${task.title}</h2>
                <p>${task.content}</p>
                <div class="action">
                    <input type="checkbox" class="checkbox" ${task.done ? "checked" : ""} data-id=${task.id} />
                    <a href="/page/edit.html?id=${task.id}">Editer la tache</a>
                    <button data-id=${task.id}>supprimer</button>
                </div>
            </div>`;
    });
    // Ajout des gestionnaires d'événements pour la suppression et le basculement d'état des tâches
    deleteTask();
    toggleTask();
}

// Suppression d'une tâche
function deleteTask() {
    const button = document.querySelectorAll(".action button");

    button.forEach((button) => {
        button.addEventListener("click", (event) => {
            if (confirm("Êtes-vous sûr de vouloir supprimer la tâche ?")) {
                // Récupération de l'ID de la tâche à supprimer
                const id = +event.target.dataset.id;
                // Suppression de l'élément HTML correspondant
                event.target.closest(".task").remove();
                // Filtrage des tâches pour exclure celle qui doit être supprimée
                const filteredTasks = tasks.filter((task) => task.id !== id);
                // Mise à jour de la liste des tâches
                tasks = filteredTasks;
                // Mise à jour du stockage local
                localStorage.setItem("tasks", JSON.stringify(filteredTasks));
            }
        });
    });
}

// Basculement de l'état d'une tâche
function toggleTask() {
    const input = document.querySelectorAll(".action input");
    input.forEach((input) => {
        input.addEventListener('change', (event) => {
            // Récupération de l'ID de la tâche
            const id = +event.target.dataset.id;
            // Recherche de l'indice de la tâche dans la liste des tâches
            const taskIndex = tasks.findIndex(t => t.id === id);
            // Inversion de l'état de la tâche (faite / non faite)
            tasks[taskIndex].done = !tasks[taskIndex].done;
            // Mise à jour du stockage local
            localStorage.setItem("tasks", JSON.stringify(tasks));
            // Ajout ou suppression de la classe "done" pour l'affichage visuel
            if (tasks[taskIndex].done === true) {
                event.target.closest(".task").classList.add("done");
            } else {
                event.target.closest(".task").classList.remove("done");
            }
        });
    });
}

// Fonction de notification
function notify(key) {
    // Récupération de la notification correspondante dans le stockage local
    const notification = localStorage.getItem(key);
    // Affichage de la notification (s'il y en a une)
    if (notification) {
        alert(notification);
        // Suppression de la notification après l'affichage
        localStorage.removeItem(key);
    }
}
