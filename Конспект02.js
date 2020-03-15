/*
Для чего нужны потоки:
Проблема в том что размер (обьем) данных увеличивается(чем длиннее фильм или чем выше качество фото). При это хранилище 
(жесткие диски) достаточно дешевые поэтому хранить эти данные не состовляет больших проблем, НО обрабатывать эти обьемы
данных уже затруднительно. Если мы хотим понизить качество у фильма, обработать ауди дорожку ТО возникает вопрос:  как
мы будет это делать? Если мы весь фильм считаем в оперативную память то очевидно нам её не хватит!!!
Решение простое и эффективное: мы за раз обрабатываем лишь часть данных!(небольшой обьем информации). Например у нас
фильм размером 30ГБ а мы сохроняем в оперативную память лишь участок в 30сек, для этих 30сек понижаем качество, выполняем
какие то другие преобразования и созраняем их обратно на диск.
Например участок в 30сек весит 2МБ, то у нас в оперативной памяти не 30Г, а всего 2МБ

Однопоточность в Node.js означает то, что V8 запускается в один поток (наш JavaScript) выполняется в один поток
и любая блокирующая операция может заблокировать единственный поток (все остальные операции будут выполняться после
неё).

thread - Поток операциионной системы и эта сущность операционной ситемы
stream - Поток Node.js

В Node.js 4 потока: readble, writeble, duplex, transform
Readble - поток для чтения данных
Writeble - поток для записи данных
Duplex и Transform позволяют на одном обьекте выполнять обе операции: и чтения и запись. Например поток архивирования:
У нас есть какой-нибуть файл, мы файл считываем, пишим в поток архивирования и из этого же потока информацию достаем.

Внутри любого обьекта потока есть свойство buffer, куда данные то и сохраняются. Напрямую к буферу у нас доступа нет.

У readble потока есть два режима: paused & flowing (paused - пауза. flowing - режим непрерывного чтения).
В режиме паузы он ждет, пока кто-то заберет уже считанные данные. 
Что бы перевести поток из режима паузы в режим чтения есть 3 спопоба:
1. pipe() если данные будут постоянно перенапровляться то логично что они кому то нужны
2. on('data', chunk => {}) подписка на событие дэйта и в обработчик придет очередной обьем данных
3. stream.resume(резью) используется после принудительной постановки потока на паузу

Во время работы с потоками ВСЕГДА нужно помнить о двух возможных развития события: Что будет во время ОШИБКИ и
во время ОБРЫВА связи???

В Node.js у обьекта response любые ошибки которые происходят с подключением, они проглатываются внутри net сервера.
Ни при какой ошибки сети на обьекте response событие ошибки не произойдет. Это очень важно!!! 

Обработка обрыва связи это обработка события close на обьекте response (res.on('close'), () => ...)

Уничтожать потоки не нужно, нода сама все почистить, нужно уничтожать необработанные данные в буфере

Файловый дескриптор это сущность операционной системы и мы её можем представить как ссылкой на открытый файл

Атомарные операции - операции которые выполняются за одно действие

К потокам нужно относится так: никто не знает сколько там данных есть и никто не может гарантировать что 
данные будут идти безпрерывно

Размер загружаемого пользователем файла, можно определить двумя способами:
1. Посмотреть заголовок Content-Length
2. Подписаться на событие 'data' и вручную складывать чанки ожидая пока размер чанок превысит максимально-разрешенный

Обьекты (req, res) связанны с одним и тем же элементом подключения и фактически закрывая один обьект мы 
закрываем и второй. Мы не можем закрыть response так, чтобы request остался

Потоки всегда сущетсвуют рядом с какой-то вещью которая представляет наш реальный мир. Например если (req, res) то
мы говорим о конекшене сети интернет, если это потоки чтения/записи файлов то это жесткие диски. Соответственно
скорости разных потоков могут отличатся

Протокол HTTP так устроен, что заголовки отсылаются отдельно от тела и ДО отправки тела (т.е. сначало отсылаются
заголовки, а потом тело)

unit - такими тестами проверяет один не большой юнит, один небольшой кусочек функциональности например функцию
integration
*/