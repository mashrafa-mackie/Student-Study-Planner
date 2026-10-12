function changeStatus(button) {

    if (button.innerText === "Pending") 
    {
        button.innerText = "Completed";
        button.classList.add("completed");
    } 
    else 
    {
        button.innerText = "Pending";
        button.classList.remove("completed");
    }

        saveTasks();
}
    function addTask() {

    let taskName = document.getElementById("taskName").value;
    let subject = document.getElementById("taskSubject").value;
    let date = document.getElementById("taskDate").value;

    console.log("Task:", taskName);
    console.log("Subject:", subject);
    console.log("Date:", date);

    if (taskName === "" || subject === "" || date === "") {
        alert("Please fill in all fields.");
        return;
    }

    let taskList = document.querySelector(".task-list");

    let newTask = document.createElement("div");
    newTask.className = "task-card";
    newTask.dataset.date = date;

    newTask.innerHTML =
        "<h3>📝 " + subject + "</h3>" +
        "<p>" + taskName + "</p>" +
        "<span>" + getDueStatus(date) + "</span>" +
        '<button class="status-btn" onclick="changeStatus(this)">Pending</button>' +
        '<button class="delete-btn" onclick="deleteTask(this)">🗑️ Delete</button>';

    taskList.appendChild(newTask);

    saveTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("taskSubject").value = "";
    document.getElementById("taskDate").value = "";

}

   function deleteTask(button)
   {

    let task = button.parentElement;

    task.remove();

    saveTasks();

}
function saveTasks() {

    let tasks = [];

    document.querySelectorAll(".task-card").forEach(function(task) {

        let statusButton = task.querySelector(".status-btn");

        tasks.push({
            name: task.querySelector("p").innerText,
            subject: task.querySelector("h3").innerText
            .replace("📝 ", "")
            .replace("💻 ", "")
            .replace("☕ ", "")
            .replace("📊 ", "")
            .replace("🖌 ", ""),
            date: task.dataset.date || task.querySelector("span").innerText,
            completed: statusButton.innerText === "Completed"
        });

    });

    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

    function updateProgress() {

    let savedTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

    let total = savedTasks.length;
    let completed = savedTasks.filter(task => task.completed).length;
    let pending = total - completed;

    let percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    let totalElement = document.getElementById("totalTasks");
    let completedElement = document.getElementById("completedTasks");
    let pendingElement = document.getElementById("pendingTasks");
    let percentageElement = document.getElementById("progressPercentage");
    let progressFill = document.getElementById("progressFill");

    if (totalElement) {
        totalElement.innerText = total;
        completedElement.innerText = completed;
        pendingElement.innerText = pending;
        percentageElement.innerText = percentage + "%";
        progressFill.style.width = percentage + "%";
    }
}

   
function loadTasks() {

    let savedTasks = JSON.parse(localStorage.getItem("studyTasks"));

    if (!savedTasks) {
        return;
    }

    let taskList = document.querySelector(".task-list");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    savedTasks.forEach(function(task) {

        let newTask = document.createElement("div");

        newTask.className = "task-card";
        newTask.dataset.date = task.date;

        newTask.innerHTML =
            "<h3>" + task.subject + "</h3>" +
            "<p>" + task.name + "</p>" +
            "<span>" + getDueStatus(task.date) + "</span>" +
            '<button class="status-btn" onclick="changeStatus(this)">Pending</button>' +
            '<button class="edit-btn" onclick="editTask(this)">✏️ Edit</button>' +
            '<button class="delete-btn" onclick="deleteTask(this)">🗑️ Delete</button>';

        if (task.completed) {

            let statusButton = newTask.querySelector(".status-btn");

            statusButton.innerText = "Completed";

            statusButton.classList.add("completed");
        }

        taskList.appendChild(newTask);

    });
}

function updateDashboard() {

    let savedTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

    let total = savedTasks.length;

    let completed = savedTasks.filter(function(task) {
        return task.completed;
    }).length;

    let progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    let subjects = new Set();

    savedTasks.forEach(function(task) {
        subjects.add(task.subject);
    });

    let subjectElement = document.getElementById("dashboardSubjects");
    let taskElement = document.getElementById("dashboardTasks");
    let progressElement = document.getElementById("dashboardProgress");

    if (subjectElement) {
        subjectElement.innerText = subjects.size;
    }
    if (taskElement) {
        taskElement.innerText = total;
    }

    if (progressElement) {
        progressElement.innerText = progress + "%";
    }

        let networkCount = 0;
    let javaCount = 0;
    let economicsCount = 0;
    let uiCount = 0;

    savedTasks.forEach(function(task) {

        if (task.subject === "Computer Network") {
            networkCount++;
        }

        if (task.subject === "Java") {
            javaCount++;
        }

        if (task.subject === "Economics") {
            economicsCount++;
        }

        if (task.subject === "UI Design") {
            uiCount++;
        }

    });

    let networkElement = document.getElementById("networkTasks");
    let javaElement = document.getElementById("javaTasks");
    let economicsElement = document.getElementById("economicsTasks");
    let uiElement = document.getElementById("uiTasks");

    if (networkElement) {
        networkElement.innerText = networkCount + " Tasks";
    }

    if (javaElement) {
        javaElement.innerText = javaCount + " Tasks";
    }

    if (economicsElement) {
        economicsElement.innerText = economicsCount + " Tasks";
    }

    if (uiElement) {
        uiElement.innerText = uiCount + " Tasks";
    }
}

if (document.querySelector(".task-list")) {
    loadTasks();
}

updateProgress();
updateDashboard();

    function filterTasks(subject) {

    let taskCards = document.querySelectorAll(".task-card");

    taskCards.forEach(function(task) {

        let taskSubject = task.querySelector("h3").innerText;

        taskSubject = taskSubject
            .replace("📝 ", "")
            .replace("💻 ", "")
            .replace("☕ ", "")
            .replace("📊 ", "")
            .replace("🖌 ", "");

        if (subject === "All" || taskSubject === subject) {
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }

    });
}
function getDueStatus(date) {

    // Convert the value to text
    date = String(date);

    // Remove "Due: " if it already exists
    date = date.replace("Due: ", "");

    // Handle the original sample tasks
    if (date === "Tomorrow") {
        return "🟠 Due Tomorrow";
    }

    if (date === "Today") {
        return "🟢 Due Today";
    }

    if (date === "Friday" ||
        date === "Saturday" ||
        date === "Sunday" ||
        date === "Monday" ||
        date === "Tuesday" ||
        date === "Wednesday" ||
        date === "Thursday") {

        return "🔵 Due " + date;
    }

    // Check whether this is actually a valid date
    let dueDate = new Date(date);

    if (isNaN(dueDate.getTime())) {
        return "📅 Due: " + date;
    }

    let today = new Date();

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    let difference = dueDate - today;

    let days = Math.round(
        difference / (1000 * 60 * 60 * 24)
    );

    if (days < 0) {
        return "🔴 Overdue";
    }

    if (days === 0) {
        return "🟢 Due Today";
    }

    if (days === 1) {
        return "🟠 Due Tomorrow";
    }

    return "🔵 Due in " + days + " days";
}
function editTask(button) {

    let task = button.parentElement;

    let taskName = task.querySelector("p").innerText;

    let currentSubject = task.querySelector("h3").innerText
        .replace("💻 ", "")
        .replace("☕ ", "")
        .replace("📊 ", "")
        .replace("🖌 ", "")
        .replace("📝 ", "");

    let newName = prompt("Edit task name:", taskName);

    if (newName === null || newName.trim() === "") {
        return;
    }

    let newSubject = prompt(
        "Enter subject (Computer Network, Java, Economics, UI Design):",
        currentSubject
    );

    if (newSubject === null || newSubject.trim() === "") {
        return;
    }

    let dateInput = document.createElement("input");
    dateInput.type = "date";

    dateInput.value = task.dataset.date || "";

    let newDate = prompt(
        "Please enter the new due date in YYYY-MM-DD format:",
        dateInput.value
    );

    if (newDate === null || newDate.trim() === "") {
        return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
        alert("Please enter the date as YYYY-MM-DD.");
        return;
    }

    task.querySelector("p").innerText = newName.trim();
    task.querySelector("h3").innerText = newSubject.trim();

    task.dataset.date = newDate;
    task.querySelector("span").innerText = getDueStatus(newDate);

    saveTasks();
    updateProgress();
    updateDashboard();
}
function searchTasks() {

    let searchValue = document.getElementById("searchTask")
        .value.toLowerCase();

    let taskCards = document.querySelectorAll(".task-card");

    taskCards.forEach(function(task) {

        let taskName = task.querySelector("p").innerText.toLowerCase();

        let taskSubject = task.querySelector("h3").innerText.toLowerCase();

        if (
            taskName.includes(searchValue) ||
            taskSubject.includes(searchValue)
        ) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }

    });

}
function toggleTheme() {

let isDark = document.body.classList.toggle("dark-mode");

localStorage.setItem("studyTheme", isDark ? "dark" : "light");

updateThemeButton();


}

function loadTheme() {


let savedTheme = localStorage.getItem("studyTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
} else {
    document.body.classList.remove("dark-mode");
}

updateThemeButton();


}

function updateThemeButton() {


let button = document.getElementById("themeToggle");

if (button) {
    button.innerText =
        document.body.classList.contains("dark-mode")
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
}


}

loadTheme();

// ===== CALENDAR FUNCTIONALITY =====

let calendarCurrentDate = new Date();
let calendarSelectedDate = new Date();

function renderStudyCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarTasks = document.getElementById("calendarTasks");

    if (!monthYear || !calendarGrid) {
        return;
    }

    const year = calendarCurrentDate.getFullYear();
    const month = calendarCurrentDate.getMonth();

    const monthName = calendarCurrentDate.toLocaleString("en-US", {
        month: "long"
    });

    monthYear.textContent = `${monthName} ${year}`;

    calendarGrid.innerHTML = "";

    // Weekday headings
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    weekdays.forEach(day => {
        const dayElement = document.createElement("div");

        dayElement.className = "calendar-day";
        dayElement.textContent = day;

        calendarGrid.appendChild(dayElement);
    });

    // First weekday and number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();

    // Empty boxes before the first date
    for (let i = 0; i < firstDay; i++) {
        const emptyElement = document.createElement("div");

        emptyElement.className = "calendar-date empty";

        calendarGrid.appendChild(emptyElement);
    }

    // Generate dates
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement("div");

        dateElement.className = "calendar-date";
        dateElement.textContent = day;

        const dateToCheck = new Date(year, month, day);

        // Highlight today's date
        if (
            dateToCheck.getFullYear() === today.getFullYear() &&
            dateToCheck.getMonth() === today.getMonth() &&
            dateToCheck.getDate() === today.getDate()
        ) {
            dateElement.classList.add("today");
        }

        // Highlight the selected date
        if (
            dateToCheck.getFullYear() === calendarSelectedDate.getFullYear() &&
            dateToCheck.getMonth() === calendarSelectedDate.getMonth() &&
            dateToCheck.getDate() === calendarSelectedDate.getDate()
        ) {
            dateElement.classList.add("selected");
        }

        // Select a date
        dateElement.addEventListener("click", function () {
            calendarSelectedDate = new Date(year, month, day);

            renderStudyCalendar();
            showSelectedCalendarDate();
        });

        calendarGrid.appendChild(dateElement);
    }

    showSelectedCalendarDate();
}

// Display the selected date

function showSelectedCalendarDate() {
    const calendarTasks = document.getElementById("calendarTasks");

    if (!calendarTasks) {
        return;
    }

    const selectedYear = calendarSelectedDate.getFullYear();
    const selectedMonth = calendarSelectedDate.getMonth();
    const selectedDay = calendarSelectedDate.getDate();

    const selectedDateText = calendarSelectedDate.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

    // Load saved tasks
    let tasks = [];

    try {
        tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];
    } catch (error) {
        console.error("Could not load saved tasks:", error);
    }

   // Find tasks due on the selected date
const selectedDateKey =
    selectedYear + "-" +
    String(selectedMonth + 1).padStart(2, "0") + "-" +
    String(selectedDay).padStart(2, "0");

const matchingTasks = tasks.filter(task => {
    const dueDate = String(
        task.date || task.taskDate || task.dueDate || ""
    ).trim();

    // Compare the actual saved date with the selected calendar date
    return dueDate === selectedDateKey;
});
    // Display the selected date
    calendarTasks.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = selectedDateText;
    calendarTasks.appendChild(heading);

    if (matchingTasks.length === 0) {
        const message = document.createElement("p");
        message.textContent = "📚 No tasks due on this date.";
        calendarTasks.appendChild(message);
        return;
    }

    // Display tasks
    matchingTasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = "calendar-task-card";

        const taskName = document.createElement("p");
        taskName.textContent = task.name || "Untitled Task";

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + (task.subject || "Not specified");

        const status = document.createElement("p");
        status.textContent =
            "Status: " + (task.completed ? "Completed" : "Pending");

        taskCard.appendChild(taskName);
        taskCard.appendChild(subject);
        taskCard.appendChild(status);

        calendarTasks.appendChild(taskCard);
    });
}


renderStudyCalendar();

