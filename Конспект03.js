/*
Синхронные ошибки промисы ПЕРЕХВАТЫВАЮТ! Но делать так не стоит, лучше использовать reject

Promise.all() - принимает массив промисов и дожидается когда они все выполнятся. Если хоть в одном 
промисе будет ошибка мы попадем в блок catch, запросы от всех промисов будут отправлены (параллельно), но результаты
от этих запросов будут проигнорированны т.к. промис уже поменял своё состояние
Избежать этого можно добавив каждому промису блок catch(). Например someDo(url).catch(err => err)

Async/await это новый интерфейс промисов.
По умолчанию функции возвращают undefined, но если к функции добавить оператор async то он будет возвращать промис

Если функция b() вызывает функцию c(), а функция c() вызывает функцию a() и она в свою очередь возвращает (return)
ошибку, то функция b() об этому даже не узнает, однако если функция a() бросит ошибку (throw) то повалит весь процесс.
Это очень удобно. Например если нам надо обработать одну и туже ошибку в разных местах, то нет необходимости дублирова-
ния кода, можно просто на верхнем уровне её поймать try catch
*/