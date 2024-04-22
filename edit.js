// *** Extraire l'id depuis l'url
const urlParams = new URLSearchParams(window.location.search);
const taskId = +urlParams.get('id');

// *** Récupérer les tâches depuis le localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// *** Trouver la tâche à modifier
const taskIndex = tasks.findIndex(task => task.id === taskId);
const task = tasks[taskIndex];

// *** Vérifier si la tâche existe
if (task) {
    // *** Pré-remplir le formulaire de modification avec les données de la tâche
    const input = document.querySelector('input');
    const textarea = document.querySelector('textarea');
    input.value = task.title;
    textarea.value = task.content;

    // *** Récupérer le formulaire et écouter la soumission
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
       
        // *** Modifier la tâche
        tasks[taskIndex].title = input.value;
        tasks[taskIndex].content = textarea.value;

        // *** Mettre à jour le localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // *** Redirection vers la page d'accueil après la modification
        window.location.href = '/';
    });
} else {
    console.error('La tâche spécifiée n\'existe pas.');
}
