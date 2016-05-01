# Caves Of Herobora

Бродилка подземелье

## Установка (Deploy)
```
npm install # установка зависимостей
npm start # запустить мини-сервер и собрать проект
```

Если консоль не находит webpack или http-server, устанавливаем их глобально:
```
npm i -g http-server webpack
```

## Работа с ветками:
- Во время разработки, создаем свою ветвь:
```
git checkout -b [username]
```

- Создание и оновление своей ветки в репозиторий на github:
```
git push origin [username]:[username]
```

- Подтягивание обновлений из основной ветки (master):
```
git checkout master
git pull
git checkout [username]
git merge master
```