const personContainer = document.querySelector(".person-container");

// Sayfa yüklendiğinde, localStorage'dan kişileri ve görevleri al
window.addEventListener("load", () => {
    const storedPeople = JSON.parse(localStorage.getItem("people")) || [];

    for (const storedPerson of storedPeople) {
        const newPerson = document.createElement("div");
        newPerson.className = "person";
        newPerson.innerHTML = `
      <button class="add-task-button">Yeni Görev Ekle</button>
      <button class="remove-person-button">Kişiyi Sil</button>
    `;

        personContainer.appendChild(newPerson);

        // Her kişi için localStorage'dan görevleri al
        const storedTasks = storedPerson.tasks || [];
        for (const task of storedTasks) {
            const taskContainer = newPerson.querySelector(".add-task-button").parentElement;
            const newTask = document.createElement("div");
            newTask.className = "task";
            newTask.innerHTML = `
        <button class="remove-task-button">Görevi Sil</button>
      `;
            taskContainer.appendChild(newTask);
        }
    }
});

personContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("add-person-button")) {
        // Yeni kişi ekle
        const newPerson = document.createElement("div");
        newPerson.className = "person";
        newPerson.innerHTML = `
      <button class="add-task-button">Yeni Görev Ekle</button>
      <button class="remove-person-button">Kişiyi Sil</button>
    `;
        personContainer.appendChild(newPerson);

        // Sayfa sağa doğru genişlet
        personContainer.style.maxWidth = (personContainer.scrollWidth + 250) + "px";

        // Kişileri localStorage'a kaydet
        savePeople();
    } else if (target.classList.contains("add-task-button")) {
        // Yeni görev ekle
        const taskContainer = target.parentElement;
        const newTask = document.createElement("div");
        newTask.className = "task";
        newTask.innerHTML = `
      <button class="remove-task-button">Görevi Sil</button>
    `;
        // Rasgele bir renk seç
        const randomColor = getRandomColor();
        newTask.style.backgroundColor = randomColor;
        taskContainer.appendChild(newTask);

        // Kişiyi aşağı doğru genişlet
        const person = taskContainer.parentElement;
        person.style.maxHeight = person.scrollHeight + "px";

        // Kişileri localStorage'a kaydet
        savePeople();
    } else if (target.classList.contains("remove-person-button")) {
        // Kişiyi sil
        const person = target.parentElement;
        person.remove();

        // Kişileri localStorage'dan kaldır
        savePeople();
    } else if (target.classList.contains("remove-task-button")) {
        // Görevi sil
        const task = target.parentElement;
        task.remove();

        // Kişiyi aşağı doğru genişlet
        const person = taskContainer.parentElement;
        person.style.maxHeight = person.scrollHeight + "px";

        // Kişileri localStorage'a kaydet
        savePeople();
    }
});

function savePeople() {
    // Tüm kişileri ve görevleri localStorage'a kaydet
    const people = Array.from(personContainer.querySelectorAll(".person"));
    const dataToStore = people.map(person => {
        const tasks = Array.from(person.querySelectorAll(".task")).map(task => {
            return { taskData: "task data" }; // Görev verilerinizi burada saklayın
        });
        return { tasks };
    });
    localStorage.setItem("people", JSON.stringify(dataToStore));
}

function getRandomColor() {
    // Rasgele bir renk üret
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}