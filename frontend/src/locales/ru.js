const ru = {
  translation: {
    form: {
      validation: {
        required: 'Обязательное поле',
        length: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
        lengthPassword: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      },
      login: {
        username: 'Ваш ник',
        password: 'Пароль',
        btn_login: 'Войти',
      },
      signup: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        btn_signup: 'Зарегистрироваться',
      },
    },
    titles: {
      appName: 'Hexlet Chat',
      login: 'Войти',
      signup: 'Регистрация',
      logout: 'Выйти',
      no_account: 'Нет аккаунта?',
      to_home: 'Перейти на главную страницу',
      channel: 'Каналы',
      channelManagement: 'Управление каналом',
      count_msg: 'сообщений',
      newMessage: 'Новое сообщение',
      msg_one: '{{count}} сообщение',
      msg_few: '{{count}} сообщения',
      msg_many: '{{count}} сообщений',
      placeholder: {
        in_message: 'Введите сообщение',
      },
      menu: {
        add: 'Добавить',
        remove: 'Удалить',
        rename: 'Переименовать',
      },
      modal: {
        create: 'Добавить канал',
        rename: 'Переименовать канал',
        remove: 'Удалить канал',
        isSure: 'Уверены?',
        channelName: 'Имя канала',
      },
      btn: {
        send: 'Отправить',
        cancel: 'Отменить',
        remove: 'Удалить',
      },
    },
    notification: {
      create: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
      error: 'Произошла ошибка',
    },
    errors: {
      network_error: 'Ошибка сети',
      authorize_error: 'Неверные имя пользователя или пароль',
      unknown_error: 'Неизвестная ошибка',
      not_found: 'Страница не найдена',
    },
  },
};

export default ru;
