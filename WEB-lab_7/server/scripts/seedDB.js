const { Instructor, Participant, MasterClass } = require('../models');

const instructorsData = [
  { fullName: 'Иванов Иван Иванович', specialization: 'Диетолог' },
  { fullName: 'Петрова Мария Сергеевна', specialization: 'Нутрициолог' },
  { fullName: 'Сидоров Петр Александрович', specialization: 'Эндокринолог' },
  { fullName: 'Козлова Анна Владимировна', specialization: 'Гастроэнтеролог' },
  { fullName: 'Смирнов Дмитрий Николаевич', specialization: 'Диетолог' },
  { fullName: 'Волкова Елена Игоревна', specialization: 'Нутрициолог' },
  { fullName: 'Новиков Алексей Викторович', specialization: 'Эндокринолог' },
  { fullName: 'Федорова Ольга Петровна', specialization: 'Гастроэнтеролог' },
  { fullName: 'Морозов Сергей Дмитриевич', specialization: 'Диетолог' },
  { fullName: 'Павлова Татьяна Алексеевна', specialization: 'Нутрициолог' },
];

const participantsData = [
  { fullName: 'Алексеев Алексей Алексеевич', email: 'alexeev@mail.ru', phone: '+7 (999) 111-11-11' },
  { fullName: 'Борисов Борис Борисович', email: 'borisov@mail.ru', phone: '+7 (999) 222-22-22' },
  { fullName: 'Васильев Василий Васильевич', email: 'vasiliev@mail.ru', phone: '+7 (999) 333-33-33' },
  { fullName: 'Григорьев Григорий Григорьевич', email: 'grigoriev@mail.ru', phone: '+7 (999) 444-44-44' },
  { fullName: 'Дмитриев Дмитрий Дмитриевич', email: 'dmitriev@mail.ru', phone: '+7 (999) 555-55-55' },
  { fullName: 'Егоров Егор Егорович', email: 'egorov@mail.ru', phone: '+7 (999) 666-66-66' },
  { fullName: 'Жуков Жук Жукович', email: 'zhukov@mail.ru', phone: '+7 (999) 777-77-77' },
  { fullName: 'Зайцев Заяц Зайцевич', email: 'zaitsev@mail.ru', phone: '+7 (999) 888-88-88' },
  { fullName: 'Иванова Ирина Ивановна', email: 'ivanova@mail.ru', phone: '+7 (999) 999-99-99' },
  { fullName: 'Кузнецов Кузьма Кузьмич', email: 'kuznetsov@mail.ru', phone: '+7 (999) 000-00-00' },
  { fullName: 'Лебедев Лебедь Лебедевич', email: 'lebedev@mail.ru', phone: '+7 (999) 101-01-01' },
  { fullName: 'Михайлов Михаил Михайлович', email: 'mikhailov@mail.ru', phone: '+7 (999) 202-02-02' },
  { fullName: 'Николаев Николай Николаевич', email: 'nikolaev@mail.ru', phone: '+7 (999) 303-03-03' },
  { fullName: 'Орлов Орел Орлович', email: 'orlov@mail.ru', phone: '+7 (999) 404-04-04' },
  { fullName: 'Петров Петр Петрович', email: 'petrov@mail.ru', phone: '+7 (999) 505-05-05' },
  { fullName: 'Романов Роман Романович', email: 'romanov@mail.ru', phone: '+7 (999) 606-06-06' },
  { fullName: 'Соколов Сокол Соколович', email: 'sokolov@mail.ru', phone: '+7 (999) 707-07-07' },
  { fullName: 'Титов Тит Титович', email: 'titov@mail.ru', phone: '+7 (999) 808-08-08' },
  { fullName: 'Уткин Утка Уткинович', email: 'utkin@mail.ru', phone: '+7 (999) 909-09-09' },
  { fullName: 'Федоров Федор Федорович', email: 'fedorov@mail.ru', phone: '+7 (999) 110-10-10' },
];

async function seedDatabase() {
  try {
    console.log('Начало заполнения базы данных тестовыми данными...\n');

    // Очистка существующих данных
    await MasterClass.destroy({ where: {}, truncate: true });
    await Participant.destroy({ where: {}, truncate: true });
    await Instructor.destroy({ where: {}, truncate: true });

    // Создание инструкторов
    console.log('Создание инструкторов...');
    const instructors = await Instructor.bulkCreate(instructorsData);
    console.log(`✓ Создано ${instructors.length} инструкторов\n`);

    // Создание участников
    console.log('Создание участников...');
    const participants = await Participant.bulkCreate(participantsData);
    console.log(`✓ Создано ${participants.length} участников\n`);

    // Создание мастер-классов
    console.log('Создание мастер-классов...');
    const masterClassesData = [];
    const now = new Date();
    
    for (let i = 0; i < 20; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i + 1); // Даты в будущем
      date.setHours(10 + (i % 8), 0, 0, 0);

      const instructorIndex = i % instructors.length;
      const participantCount = Math.floor(Math.random() * 5) + 1; // 1-5 участников
      const participantIds = [];
      for (let j = 0; j < participantCount; j++) {
        const participantIndex = (i * participantCount + j) % participants.length;
        if (!participantIds.includes(participants[participantIndex].id)) {
          participantIds.push(participants[participantIndex].id);
        }
      }

      masterClassesData.push({
        name: `Мастер-класс по здоровому питанию ${i + 1}`,
        description: `Подробный мастер-класс о правильном питании, здоровом образе жизни и составлении сбалансированного рациона. На занятии вы узнаете основы нутрициологии, научитесь составлять меню и получите практические советы от опытного специалиста.`,
        price: (Math.random() * 5000 + 1000).toFixed(2), // 1000-6000
        date: date,
        photo: `https://picsum.photos/400/300?random=${i + 1}`,
        instructorId: instructors[instructorIndex].id,
        participantIds: participantIds,
      });
    }

    const masterClasses = await MasterClass.bulkCreate(masterClassesData);
    console.log(`✓ Создано ${masterClasses.length} мастер-классов\n`);

    const totalRecords = instructors.length + participants.length + masterClasses.length;
    console.log(`✓ База данных успешно заполнена!`);
    console.log(`  Всего записей: ${totalRecords}`);
    console.log(`  - Инструкторов: ${instructors.length}`);
    console.log(`  - Участников: ${participants.length}`);
    console.log(`  - Мастер-классов: ${masterClasses.length}`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
}

seedDatabase();

