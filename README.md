Веб-приложение для отображения графика работы "2 через 2".

За основу взят календарь http://www.calendarandti.me/, написанный [Joshua Miller](mailto:joshuamil@gmail.com) и использующий [Twitter Bootstrap](http://twitter.github.com/bootstrap/). JS был значительно переписан и доработан. Для выбора даты в мини-админке был задействован [bootstrap-datepicker](https://github.com/eternicode/bootstrap-datepicker).

Используемая БД: `sqlite`.

## Установка

``` bash
# при необходимости ставим sqlite
$ git clone git://github.com/7even/denis.git
$ cd ./denis
$ bundle install # ставим зависимости
$ rake install   # инициализируем БД
$ rackup         # запускаем (при желании используем любой rack-совместимый сервер)
```
