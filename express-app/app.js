const API_BASE = '/api/masterclasses';
let masterclasses = [];
let selectedIds = [];
let currentEditId = null;

// Загрузка мастер-классов
async function loadMasterclasses() {
    hideError();
    try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        masterclasses = await res.json();
        renderMasterclasses();
    } catch (err) {
        showError(err.message);
    }
}

// Отображение мастер-классов
function renderMasterclasses() {
    const list = document.getElementById('masterclassList');
    list.innerHTML = masterclasses.map(item => `
        <li class="masterclass-card ${selectedIds.includes(item.id) ? 'selected' : ''}" id="card-${item.id}">
            <input type="checkbox" ${selectedIds.includes(item.id) ? 'checked' : ''} 
                   onchange="toggleSelect(${item.id})">
            <h3>${item.name}</h3>
            <p><strong>Описание:</strong> ${item.description}</p>
            <p><strong>Участники:</strong> ${item.participants}</p>
            <p><strong>Врачи:</strong> ${item.doctors}</p>
            ${item.date ? `<p><strong>Дата:</strong> ${item.date}</p>` : ''}
            <div class="card-actions">
                <button onclick="editMasterclass(${item.id})">Редактировать</button>
                <button onclick="deleteMasterclass(${item.id})">Удалить</button>
            </div>
        </li>
    `).join('');
    updateDeleteButton();
}

// Выбор/снятие выбора
function toggleSelect(id) {
    if (selectedIds.includes(id)) {
        selectedIds = selectedIds.filter(i => i !== id);
    } else {
        selectedIds.push(id);
    }
    renderMasterclasses();
}

// Обновление кнопки удаления
function updateDeleteButton() {
    document.getElementById('deleteBtn').disabled = selectedIds.length === 0;
}

// Добавление мастер-класса
async function addMasterclass() {
    try {
        const res = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Новый мастер-класс',
                description: 'Введите описание',
                participants: 0,
                doctors: 0,
            }),
        });
        if (!res.ok) throw new Error('Ошибка создания мастер-класса');
        const created = await res.json();
        masterclasses.push(created);
        renderMasterclasses();
        editMasterclass(created.id);
    } catch (err) {
        showError(err.message);
    }
}

// Редактирование мастер-класса
function editMasterclass(id) {
    const item = masterclasses.find(m => m.id === id);
    if (!item) return;
    
    currentEditId = id;
    document.getElementById('modalTitle').textContent = 'Редактировать мастер-класс';
    document.getElementById('modalName').value = item.name;
    document.getElementById('modalDescription').value = item.description;
    document.getElementById('modalParticipants').value = item.participants;
    document.getElementById('modalDoctors').value = item.doctors;
    document.getElementById('modalDate').value = item.date || '';
    document.getElementById('modal').classList.add('active');
}

// Сохранение изменений
async function saveMasterclass() {
    if (!currentEditId) return;
    
    const payload = {
        name: document.getElementById('modalName').value,
        description: document.getElementById('modalDescription').value,
        participants: Number(document.getElementById('modalParticipants').value) || 0,
        doctors: Number(document.getElementById('modalDoctors').value) || 0,
        date: document.getElementById('modalDate').value,
    };

    try {
        const res = await fetch(`${API_BASE}/${currentEditId}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Ошибка сохранения');
        const updated = await res.json();
        const index = masterclasses.findIndex(m => m.id === currentEditId);
        if (index !== -1) {
            masterclasses[index] = updated;
        }
        renderMasterclasses();
        closeModal();
    } catch (err) {
        showError(err.message);
    }
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentEditId = null;
}

// Удаление одного мастер-класса
async function deleteMasterclass(id) {
    if (!confirm('Удалить этот мастер-класс?')) return;
    
    try {
        const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Ошибка удаления');
        masterclasses = masterclasses.filter(m => m.id !== id);
        selectedIds = selectedIds.filter(i => i !== id);
        renderMasterclasses();
    } catch (err) {
        showError(err.message);
    }
}

// Удаление выбранных
async function deleteSelected() {
    if (!confirm(`Удалить выбранные мастер-классы (${selectedIds.length})?`)) return;
    
    try {
        await Promise.all(selectedIds.map(id => 
            fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
        ));
        masterclasses = masterclasses.filter(m => !selectedIds.includes(m.id));
        selectedIds = [];
        renderMasterclasses();
    } catch (err) {
        showError('Ошибка удаления выбранных элементов');
    }
}

// Скачивание файла
async function downloadFile(format) {
    const acceptMap = {
        json: 'application/json',
        xml: 'application/xml',
        html: 'text/html',
    };
    try {
        const res = await fetch(`${API_BASE}/export`, {
            headers: { Accept: acceptMap[format] }
        });
        if (!res.ok) throw new Error('Ошибка скачивания');
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `masterclasses.${format}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        showError(err.message);
    }
}

// Вспомогательные функции
function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}

// Закрытие модального окна по клику вне его
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });
    
    // Загрузка данных при загрузке страницы
    loadMasterclasses();
});

