### Основные данные по проектной работе
1. Ссылка на репозиторий https://github.com/jamigo-git/LevelUp
2. Ссылка на борд https://linear.app/levelup-team/team/LVL/all 
3. Ссылка на "работающий проект" в vercel https://levelup-tower-defense.vercel.app - проект возможно не запуститься в vercel с ssh и контейнеризацией
4. Ссылка на видео с работой проекта https://www.loom.com/share/46d4fd03f8f0474f8d3b2937c4ba7256?sid=ad815414-fd0d-40c8-8072-ce01f5accc84 
<div>
    <a href="https://www.loom.com/share/46d4fd03f8f0474f8d3b2937c4ba7256">
      <p>LEVELUP 2 командный зачет - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/46d4fd03f8f0474f8d3b2937c4ba7256">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/46d4fd03f8f0474f8d3b2937c4ba7256-1b5c1827abc4092c-full-play.gif">
    </a>
  </div>

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js` (добавит env переменные и подготовит данные для базы данных)

`docker-compose build` - скомпилирует образы
`docker-compose up` - запустит сервисы (используя флаг -d запустит фоново)
1. postgres, вашу базу данных (postgres)
2. pgadmin, графическая утилита для управления БД
3. node, ваш сервер (server)
4. node, раздающий клиентскую статику (client)
`docker-compose stop` - остановит сервисы
`docker-compose ps` - выведет все активные сервисы

Если вам понадобится только один сервис, просто уточните какой в команде
Для билда `docker-compose build {sevice_name}`, например `docker-compose build server`
Для запуска `docker-compose up {sevice_name}`, например `docker-compose up server`
Для остановки `docker-compose stop {service_name}`, например `docker-compose stop server`

pgadmin находится по адресу http://localhost:8080/
Данные по-умолчанию для входа находятся в .env