const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const js2xmlparser = require('js2xmlparser');

const app = express();
const PORT = 4000;
const DATA_PATH = path.join(__dirname, 'masterclasses.json');

app.use(express.json()); //автоматически парсит JSON из тела запроса
app.use(express.static(__dirname));


// GET-сервис, который возвращает веб-страницу с фронтенд-кодом
// Что делает: отправляет HTML-файл с интерфейсом приложения
// Зачем: пользователь открывает браузер и видит веб-страницу
// Что возвращает: файл index.html с фронтенд-кодом
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

async function readData() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

function toXml(list) {
  const data = {
    masterclass: list
  };
  return js2xmlparser.parse('masterclasses', data);
}

function toHtml(list) {
  const rows = list
    .map(
      (item) =>
        `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.description}</td><td>${item.participants}</td><td>${item.doctors}</td><td>${item.date || ''}</td></tr>`
    )
    .join('');
  return `<html><head><meta charset="utf-8"><title>Мастер-классы</title></head><body><table border="1" cellpadding="6"><thead><tr><th>ID</th><th>Название</th><th>Описание</th><th>Участники</th><th>Врачи</th><th>Дата</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
}


// GET-сервис, который возвращает данные в формате JSON
// Что делает: читает данные из файла masterclasses.json и отправляет клиенту
// Зачем: фронтенд получает список всех мастер-классов для отображения
// Что возвращает: массив объектов с мастер-классами в формате JSON
app.get('/api/masterclasses', async (req, res, next) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});


// POST-сервис, который возвращает данные в формате JSON
// Что делает: создает новый мастер-класс, сохраняет в файл и возвращает его
// Зачем: пользователь нажимает "Добавить мастер-класс", создается новая запись
// Что возвращает: созданный объект мастер-класса с присвоенным ID в формате JSON
app.post('/api/masterclasses', async (req, res, next) => {
  try {
    const { name, description, participants = 0, doctors = 0, date = '' } = req.body || {};
    
    if (!name || !description) {
      return res.status(400).json({ error: 'name и description обязательны' });
    }
    
    const data = await readData();
    
    const newItem = {
      id: Date.now(),
      name,
      description,
      participants: Number(participants) || 0,
      doctors: Number(doctors) || 0,
      date,
    };
    
    data.push(newItem);
    await writeData(data);
    
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});


// POST-сервис, который принимает данные
// Что делает: принимает данные для обновления мастер-класса, обновляет его в файле
// Зачем: пользователь редактирует мастер-класс и сохраняет изменения
// Что возвращает: обновленный объект мастер-класса в формате JSON
app.post('/api/masterclasses/:id/update', async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body || {};
    
    const data = await readData();
    
    const index = data.findIndex((item) => String(item.id) === String(id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Мастер-класс не найден' });
    }
    
    const updated = {
      ...data[index],
      ...payload,
      participants: Number(payload.participants ?? data[index].participants) || 0,
      doctors: Number(payload.doctors ?? data[index].doctors) || 0,
    };
    
    data[index] = updated;
    await writeData(data);
    
    res.json(updated);
  } catch (error) {
    next(error);
  }
});


// DELETE-сервис для удаления данных
// Что делает: удаляет мастер-класс по ID из файла
// Зачем: пользователь нажимает "Удалить" на карточке мастер-класса
// Что возвращает: статус 204 (No Content) - успешное удаление без тела ответа
app.delete('/api/masterclasses/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const data = await readData();
    
    const nextData = data.filter((item) => String(item.id) !== String(id));
    
    if (nextData.length === data.length) {
      return res.status(404).json({ error: 'Мастер-класс не найден' });
    }
    
    await writeData(nextData);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});


// Сервис для получения данных в формате XML/HTML/JSON по заголовку Accept
// Что делает: читает данные и возвращает их в формате, указанном в заголовке Accept
// Зачем: пользователь нажимает кнопки "Скачать JSON/XML/HTML"
// Что возвращает: файл с данными в формате XML, HTML или JSON для скачивания
app.get('/api/masterclasses/export', async (req, res, next) => {
  try {
    const data = await readData();
    const preferred = req.accepts(['application/xml', 'text/html', 'application/json']);
    if (preferred === 'application/xml') {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="masterclasses.xml"');
      return res.send(toXml(data));
    }
    if (preferred === 'text/html') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="masterclasses.html"');
      return res.send(toHtml(data));
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="masterclasses.json"');
    return res.json(data);
  } catch (error) {
    next(error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

