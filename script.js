document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    // Cargar tareas desde localStorage al iniciar
    loadTasks();

    // Agregar nueva tarea
    document.querySelector("button").addEventListener("click", () => {
        if (inputBox.value.trim() !== "") {
            addTask(inputBox.value, false); // Nueva tarea no completada
            inputBox.value = ""; // Limpiar input
        }
    });

    // Añadir tarea al DOM y localStorage
    function addTask(taskText, isCompleted) {
        const li = document.createElement("li");

        // Crear checkbox para marcar como completada
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isCompleted;
        checkbox.addEventListener("change", toggleTask); // Escuchar cambios de estado
        li.appendChild(checkbox);

        // Crear span para el texto de la tarea
        const span = document.createElement("span");
        span.textContent = taskText;
        if (isCompleted) {
            span.classList.add("completed"); // Añadir clase si la tarea está completada
        }
        li.appendChild(span);

        listContainer.appendChild(li);
        saveTasks();
    }

    // Alternar el estado de la tarea
    function toggleTask(e) {
        const taskItem = e.target.nextElementSibling; // El <span> del texto de la tarea
        taskItem.classList.toggle("completed");
        saveTasks();

        // Si la tarea está completada, eliminarla después de 1 segundo
        if (e.target.checked) {
            setTimeout(() => {
                e.target.parentElement.remove(); // Eliminar el <li> completo
                saveTasks(); // Guardar el estado después de la eliminación
            }, 1000);
        }
    }

    // Guardar tareas en localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("ul li").forEach(task => {
            const taskText = task.querySelector("span").textContent;
            const isCompleted = task.querySelector("input").checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Cargar tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
});
