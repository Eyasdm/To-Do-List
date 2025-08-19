'use strict';

/**
 * =============================================
 * TO-DO LIST APPLICATION
 * =============================================
 *
 * Functionality Overview:
 * ------------------------
 * 1. Add new tasks
 * 2. Mark tasks as completed
 * 3. Move completed tasks back to to-do list
 * 4. Edit the to-do list title
 * 5. Edit and delete specific tasks
 * 6. Store data in local browser storage
 * 7. Cancel edit/delete operation via X button
 *
 * Utility Behavior:
 * ------------------------
 * - Toggle action modes (edit/delete)
 * - Persist UI state using localStorage
 * - Interactive UI with event delegation
 */

// ==============================
// DOM ELEMENTS
// ==============================
const allTasks = document.querySelector('.all-tasks');
const toDoListName = document.querySelector('.to-do-list-name');
const taskMenu = document.getElementById('task-menu');
const editPen = document.getElementById('edit-to-do-list-name');
const addBtn = document.querySelector('.add-note-btn');
const toDoList = document.querySelector('.to-do-list');
const menuBtn = document.querySelector('.menu-btn');
const modal = document.querySelector('.modal');
const completedTasks = document.querySelector('.completed-tasks');
const compeletedTasksNumber = document.querySelector('.completed-tasks-num');
const tasks = document.querySelector('.tasks');
const editTask = document.querySelector('.Edit-task');
const deleteTask = document.querySelector('.Delete-task');
const languageSelect = document.querySelector('.lang-select');
const completed = document.querySelector('.completed');
const languageLabel = document.querySelector('.language-label');
const arabicLanguageOption = document.querySelector('.arabic-language-option');
const englishLanguageOption = document.querySelector(
  '.english-language-option'
);
const bodyLanguage = document.getElementById('body');
const editNamePen = document.querySelector('.edit-name-pen');
const taskBtn = document.querySelector('.task-btn');

let activeMode = null,
  selectedLanguage = '',
  customTitle = false;

// ==============================
// Utility Functions
// ==============================

/**
 * Replace input with a span after Enter is pressed.
 */
const saveHittingEnter = function (e, input, clas) {
  if (e.key === 'Enter') {
    const textValue = input.value.trim();
    if (textValue === '') return false;
    const parent = input.parentNode;
    const textElement = document.createElement('span');
    textElement.className = clas;
    textElement.textContent = textValue;
    if (parent && parent.contains(input)) {
      parent.replaceChild(textElement, input);
      return true;
    }
  }
  return false;
};

/**
 * Resets modal and edit/delete icons
 */
const XToDot = function () {
  activeMode = null;
  modal.classList.add('hidden');
  menuBtn.style.paddingBottom = '3rem';
  menuBtn.textContent = '...';
  document
    .querySelectorAll('.edit-pen')
    .forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.bin').forEach(el => el.classList.add('hidden'));
};

/**
 * Close modal if clicking outside
 */
const closeModal = function (e) {
  if (!modal.contains(e.target) && e.target !== menuBtn) {
    modal.classList.add('hidden');
    document.removeEventListener('click', closeModal);
  }
};

/**
 * Save data to localStorage
 */
const saveData = function () {
  localStorage.setItem('taskMenu1.1', taskMenu.innerHTML);
  localStorage.setItem('completedTask1.1', completedTasks.innerHTML);
  localStorage.setItem('toDoListName1.1', toDoListName.innerHTML);
  localStorage.setItem('language', selectedLanguage);
  localStorage.setItem('title', customTitle);
};

/**
 * Load data from localStorage
 */
const showTask = function () {
  const storedLang = localStorage.getItem('language');
  selectedLanguage = storedLang || 'en';

  if (!storedLang) {
    document.querySelector('.model').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');

    document
      .querySelector('.english-btn')
      .addEventListener('click', function () {
        selectedLanguage = 'en';
        localStorage.setItem('language', selectedLanguage);
        languageSelect.value = selectedLanguage;
        document.querySelector('.model').classList.add('hidden');
        document.querySelector('.overlay').classList.add('hidden');
        showTask();
      });

    document
      .querySelector('.arabic-btn')
      .addEventListener('click', function () {
        selectedLanguage = 'ar';
        localStorage.setItem('language', selectedLanguage);
        languageSelect.value = selectedLanguage;
        document.querySelector('.model').classList.add('hidden');
        document.querySelector('.overlay').classList.add('hidden');
        showTask();
      });

    return;
  }

  languageSelect.value = selectedLanguage;

  setLanguage(selectedLanguage);

  const taskMenuContent = localStorage.getItem('taskMenu1.1');
  const completedTaskContent = localStorage.getItem('completedTask1.1');
  const toDoListNameContent = localStorage.getItem('toDoListName1.1');
  customTitle = localStorage.getItem('title') === 'true';

  if (taskMenuContent) taskMenu.innerHTML = taskMenuContent;
  if (completedTaskContent) completedTasks.innerHTML = completedTaskContent;
  if (customTitle && toDoListNameContent) {
    toDoListName.innerHTML = toDoListNameContent;
  }
  compeletedTasksNumber.textContent = completedTasks.children.length;

  translateInstructionsTasks(selectedLanguage);
};

window.addEventListener('DOMContentLoaded', showTask);
('use strict');

/**
 * =============================================
 * TO-DO LIST APPLICATION WITH MULTILINGUAL SUPPORT
 * =============================================
 */

// ==============================
// Language Translations and Instructions
// ==============================

const translations = {
  en: {
    toDoName: 'To-do-list',
    completed: 'Completed',
    deleteTasks: 'Delete task',
    language: 'Language',
    arabicOption: 'Arabic',
    englishOption: 'English',
  },
  ar: {
    toDoName: 'قائمة المهام',
    completed: 'المهام المكتملة',
    deleteTasks: 'حذف المهمة',
    language: 'اللغة',
    arabicOption: 'عربي',
    englishOption: 'انجليزي',
  },
};

const instructions = {
  1: {
    en: 'Click ➕ to create a new task',
    ar: 'انقر على ➕ لإنشاء مهمة جديدة',
  },
  2: {
    en: 'To edit task click the ... menu',
    ar: 'لتحرير المهمة، انقر على قائمة ...',
  },
  3: {
    en: 'Tap the ◯ to mark task as done',
    ar: 'اضغط على ◯ لوضع علامة على المهمة كمكتملة',
  },
  4: {
    en: 'Click ✔️ to undo and return to To‑do',
    ar: 'انقر على ✔️ للتراجع والعودة إلى المهام',
  },
  5: {
    en: 'Tap ✓ to complete, then tap ... to Delete task',
    ar: 'اضغط على ✓ لإكمال المهمة، ثم اضغط على ... لحذفها',
  },
};

/**
 * Translates the instruction text of each task based on the selected language
 */
const translateInstructionsTasks = function (language) {
  document.querySelectorAll('.edit').forEach(task => {
    const id = task.dataset.id;
    const instructionText = instructions[id]?.[language] || '';
    // console.log(instructionText);
    if (instructionText !== '') task.textContent = instructionText;
  });
};

/**
 * Event listener for language selection dropdown
 */
languageSelect.addEventListener('change', function (e) {
  selectedLanguage = e.target.value;
  localStorage.setItem('language', selectedLanguage);
  setLanguage(selectedLanguage);
  translateInstructionsTasks(selectedLanguage);
  modal.classList.add('hidden');
});

/**
 * Updates the UI text and layout based on selected language
 * @param {string} language - selected language code ('en' or 'ar')
 */
const setLanguage = function (language) {
  selectedLanguage = language;
  localStorage.setItem('language', language);

  const lang = translations[language];
  if (!customTitle) toDoListName.innerHTML = lang.toDoName;
  completed.innerHTML = lang.completed;
  deleteTask.innerHTML = lang.deleteTasks;
  languageLabel.innerHTML = lang.language;
  arabicLanguageOption.innerHTML = lang.arabicOption;
  englishLanguageOption.innerHTML = lang.englishOption;

  bodyLanguage.className = language === 'ar' ? 'rtl' : 'ltr';
  editNamePen.style.transform = language === 'ar' ? 'scaleX(-1)' : 'scaleX(1)';
};

// ==============================
// Add New Task
// ==============================

/**
 * Creates an input field to add a new task and appends it to the DOM
 */
addBtn.addEventListener('click', function () {
  if (activeMode === 'add new task') {
    const existingInput = document.querySelector('.new-task-input');
    if (existingInput) existingInput.focus();
    return;
  }

  activeMode = 'add new task';

  const divContainer = document.createElement('div');
  divContainer.className = 'task edit-area';
  const placeholder =
    selectedLanguage === 'ar' ? 'أضف مهمة جديدة' : 'Add a new task';

  divContainer.innerHTML = `
    <div class="task-content">
      <span><button class="task-btn"></button></span>
      <span><input type="text" placeholder="${placeholder}" class="new-task-input" /></span>
    </div>
  `;

  taskMenu.appendChild(divContainer);

  const input = divContainer.querySelector('input');
  input.focus();
  input.addEventListener('keydown', function (e) {
    if (saveHittingEnter(e, input, 'text-value edit')) {
      activeMode = null;
      saveData();
    }
  });
});

// ==============================
// Mark Task as Completed
// ==============================

/**
 * Moves a task from to-do list to completed list
 * @param {string} textValue - task text
 * @param {string} oldid - task id
 */
const addToCompleted = function (textValue, oldid) {
  completedTasks.insertAdjacentHTML(
    'afterbegin',
    `<div class="completed-task edit-area">
      <div class="task-content">
        <span class="completed-task-area">
          <button class="completed-task-btn">✔</button></span>
        <span class="completed-task-text edit" data-id="${oldid}">${textValue}</span>
      </div>
      <span>
        <img src="img/recycle-bin.png" alt="Edit pen" class="icon bin hidden" />
      </span>
    </div>`
  );
  compeletedTasksNumber.textContent = completedTasks.children.length;
  saveData();
};

/**
 * Event listener to detect when a task is marked as complete
 */
taskMenu.addEventListener('click', function (e) {
  if (e.target.classList.contains('task-btn')) {
    const taskElement = e.target.closest('.task');
    const textElement = taskElement.querySelector('.text-value');
    if (!textElement) return;
    const textValue = textElement.textContent;
    const oldid = textElement.dataset.id || 0;
    taskElement.remove();
    addToCompleted(textValue, oldid);
  }
});

// ==============================
// Edit To-Do List Title
// ==============================

/**
 * Event listener to edit the to-do list title
 */
editPen.addEventListener('click', function () {
  const divParent = this.parentNode;
  const toDoListName = divParent.querySelector('.to-do-list-name');
  const input = document.createElement('input');
  input.className = 'to-do-list';
  input.value = toDoListName.textContent;
  toDoListName.parentNode.replaceChild(input, toDoListName);
  input.focus();

  editNamePen.classList.add('hidden');
  document.addEventListener('keydown', function (e) {
    if (saveHittingEnter(e, input, 'to-do-list-name')) {
      toDoListName.textContent = input.value.trim();
      customTitle = true;
      saveData();
      editNamePen.classList.remove('hidden');
    }
  });
});

// ==============================
// Move Completed Task Back to To-do
// ==============================

/**
 * Event listener to move a completed task back to to-do list
 */
completedTasks.addEventListener('click', function (e) {
  if (e.target.classList.contains('completed-task-btn')) {
    const completedElement = e.target.closest('.completed-task');
    const textElement = completedElement.querySelector('.completed-task-text');
    if (!textElement) return;
    const oldid = textElement.dataset.id || 0;
    const textValue = textElement.textContent;
    completedElement.remove();

    tasks.insertAdjacentHTML(
      'beforeend',
      `<div class="task edit-area">
        <div class="task-content">
          <span><button class="task-btn"></button></span>
          <span class="text-value edit" data-id="${oldid}">${textValue}</span>
        </div>
      </div>`
    );
    compeletedTasksNumber.textContent = completedTasks.children.length;
    saveData();
  }
});

// ==============================
// Toggle Modal for Edit/Delete Options
// ==============================

/**
 * Toggles the visibility of the edit/delete task modal
 */
menuBtn.addEventListener('click', function () {
  if (activeMode === 'Edit task' || activeMode === 'Delete task') {
    XToDot();
    return;
  }
  modal.classList.toggle('hidden');
  if (!modal.classList.contains('hidden')) {
    document.addEventListener('click', closeModal);
  }
});

// ==============================
// Edit Task Text
// ==============================

/**
 * Event listener to enable inline editing of task text
 */
taskMenu.addEventListener('click', function (e) {
  if (e.target.classList.contains('text-value')) {
    if (activeMode) return;
    activeMode = 'Edit task';

    const editArea = e.target.closest('.edit-area');
    const taskToBeEdited = editArea.querySelector('.edit');
    if (!taskToBeEdited) return;

    const input = document.createElement('input');
    input.className = 'text-value';
    input.value = taskToBeEdited.textContent;
    taskToBeEdited.parentNode.replaceChild(input, taskToBeEdited);
    input.focus();
    input.addEventListener('keydown', function (e) {
      saveHittingEnter(e, input, 'text-value edit');
      XToDot();
      saveData();
    });
  }
});

// ==============================
// Delete Task
// ==============================

/**
 * Event listener to activate delete mode and remove tasks
 */
deleteTask.addEventListener('click', function () {
  if (activeMode) return;
  activeMode = 'Delete task';
  menuBtn.textContent = 'X';
  menuBtn.style.paddingBottom = '0.5rem';
  modal.classList.add('hidden');

  document
    .querySelectorAll('.bin')
    .forEach(el => el.classList.remove('hidden'));

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('bin')) {
      const deleteArea = e.target.closest('.edit-area');
      deleteArea.remove();
      compeletedTasksNumber.textContent = completedTasks.children.length;
      saveData();
    }
  });
});

// ==============================
// Reset Application
// ==============================

/**
 * Clears all saved local storage data and reloads the page
 */
function reset() {
  localStorage.clear();
  location.reload();
}
