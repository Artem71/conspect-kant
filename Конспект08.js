/*
Докер сейчас является основным кирпичиком в построениее продакшен систем
Докер это решение для виртуализации(не полноценная виртуализация) (средство которое позволяет нам запускать 
виртуальные машины) с обсолютно изолированными в них средами, соответственно запускать в них наше приложение.
Не важно какие у нас используются технологии, неважно наше окружение(джава, хаскель, нода..) все что нам нужно
установить докер и все настройки
Виртуальная машина в терминах докера это контейнер, при это он запускается из имейджа (образа).
Докер работает только на линуксе. На других ос он запускает виртуальный линукс и в нем запускается сам.
Еще раз про докер:
У нас есть такое понятие как образ. Образ это дистрибутив, но к этому дистрибутиву можно добавлять дистибутивы сверху.
Набример монгоДБ + Нджиикс. Идеалогия докера - для одного процесса запускается только один контейнер.

Nginx - это http сервер, НО обычно его рассматривают как реверс прокси. Он умеет ОЧЕНЬ эффективно обрабатывать входящие
http запросы. Обрабатывает одновременно огромное их колличество, очень надежно с этим делом работает, очень быстро
умеет работать с файловой системой. В то же самое время в нем практически нет логики: например он не умеет 
аутенфицировать пользователя с использование бд и т.д. Поэтому его обычно используют для того, что он делает лучше
всего:
Сначало стоит Nginx - все запросы к нашему сайту (приложению) поступают именно на него, а он уже перепровляет запросы
на ноду.
*/