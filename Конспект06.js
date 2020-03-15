/*
Отправка почты в интернете
Есть специальные сервера которые работают по специальному протоколу и любой кто хочет отправить почту он подключается к
этому серверу и передает свой запрос.
Протокол этот называется SMTP. Нам не нужно руками формировать пакеты для запроса или обрабатывать возникшие ошибки: 
для всего этого есть специальный модуль: nodemaller. Все что нужно сделать - сконфигурировать транспорт. В терминологии
мэйлера транспорт это та сущность(вещь) которая уже подключается к выбранному серверу и отсылает ему запросы на 
отправку писем.

Отправка почты через бесплатный аккаунт gmail
Плюсы - бесплатно, очень просто настроивать
Минусы - довольно низкие лимиты на отправку писем (около 1000 в день), вы не можете использовать несколько имейлов для
отправки писем (как правило сервисы отправляют разные типы писем. Например: рассылки, письма отправленные в результате
каких-то действий пользователя).

Подтверждение регистрации:
Мы генирируем какой-то токен - который будет уникален (например с помощью модуля uuid)
Далее мы в модель пользователя добавляем этот токен и поле - confirm: false
Затем мы отправляем пользователю письмо в котором есть ссылка с данным токеном
Если пользователь перешол по этой ссылке, то токен можно удалить и только после этого делаем логин


Логирование это возможность постфактум или в режиме реального времени заметить, что с приложением что-то не так, кроме
того можно собирать какую-то полезную информацию
Проблема хранения логов не должна ложиться на приложение
Приложение использует стандартные (системные) потоки вывода. Их два: stdout & stderr.


WebSocket это протокол который позволяет организавать двусторонее общение между клиентом и сервером.
Проблемы ЛонгПуллинга - это решение не полностью надежно и в момент перезапроса мы можем какие-то данные потерять, но
что более важно такое общение подразумевает обмен http запросами, а http запрос подразумевает отправку очень большого 
колличества информации (хедеры, куки и т.д.). Например если кто-то захочет отправить один символ то будет ситуация
когда служебной информации больше чем полезной.

WebSocket работает поверх TCP соединения т.е. он не имеет отношение напрямую к http. Протокол WebSocket использует
http только для установки своего соединения. WebSocket не гарантирует доставку информации несмотря на то что протокол
TCP гарантирует

Socket.io предоставляет собственный сервер который и будет заниматься обработкай запросов.
После того как мы запускаем собственный HTTP сервер мы дожны в библиотеку Socket.io передать инстанс этого сервера,
Socket.io с ним свяжется (внутри добавит свой хедлер для первого http запроса) и далее позволит обрабатывать сообщения
по веб сокетам
Socket.io гарантирует доставку

Socket.io для того что бы убедиться что соединение не разорванно, переодически посылает так называемый пинг-понг 
сообщения. Если соединение разорванно, Socket.io сама пытается переподключиться.
Вместе с этим протоколом (веб сокет) не передаются не хедера, не куки, ничего (пользователи довольно-таки безлики), 
поэтому нам важно обработать первый запрос, с целью аутентификации. Сделать это можно с помощью специальной функции
io.use() - сюда можно передать мидлвеар и обработать информацию которая будет переданна при первом запросе

socket.broadcast.emit() - эмитит сообщение всем кроме текущего пользователя

Аутентификация веб сокетов:
Первым делом мы получаем реквест, данные которые содержатся в нем называются хендШейк(запрос на изминение протокола)
Из даных реквеста можно сделать куки

Redis - база данных еще называют кимВельюСторедж, т.е. подразумевается что это очень простая база данных которая
позволяет хранить данные по ключам (не как в монго документы, колекции.. а все гораздо проще) но зато взамен Redis
предлогает невероятную скорость потому что все операции он осуществляет прямо в оперативной памяти и изредко он
синхронизируется с жестким диском, скидывает блок операций.
В результате Redis обладает высокой скоростью, но не очень высокой надежностью.
Но редис предлогает еще один интерфейс папсап(паблиш сабстрайп) - внешней евент емитер (любой может подписаться на
событие, любой может сьэмитить его) и сокет айо отклично с редисом интегрируется с помощью метода адаптер

1. У нас есть запущенная база данных редис. Мы ее не используем как базу данных (мы ничего в ней не сохраняем). Мы
пользуемся её интерфейсом который позволяет подписываться на события и их эмитить (типо где то в сети запущен обькт
евент емитора на который можно подписаться)
2. Мы этот сетевой евент емиттер (редис) используем для того чтобы синхронизировать данные между всеми нашими сокет-
серверами. Мы говрим эметим ему сообщение "у нас новое подключение", а он рассылает это сообщение всем наши нодам

*/