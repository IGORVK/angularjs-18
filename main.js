
//разберемся как работать в $http сервисом 
//напишем небольшой бекенд сервер на NodeJS который будет отвечать на наши запросы

// для начала создадим div ng-controller = "mainCtrl"
// опишем его 
// app.controller ('mainCtrl', function(){
//    
   // console.log('mainCtrl');
//     
// });

// посмотрим в консоль браузера mainCtrl вывелось. Все работает

// Заиджектим сервис $http
//выведем для проверки еще один console.log('!' , $http.get('http://localhost:3001'))
//'http://localhost:3001 у нас естественно нет и будет ошибка. Но нам вернулся объект $http.get, давайте на него посмотрим...
// у этого объекта мы видим две функции которые мы и будем использовать это error - выполнится если будут какие-то ошибки и success - выполняется если сервер дает ответ 200 - все хорошо
//$http.get('http://localhost:3001')- это наш promise - вызов-обещание и сделаем chaining success и error c консоле логами...
// посмотрим в консоль и увидим что у нас выстрелил error так как у нас 404
// И давайте напишем бекэнд, который нам поможет

//$http.get('http://localhost:3001/books') - добавим books т.е. это запрос который будет получать книги
// добавим файл book.js а в него запись которая была написана заранее и пройдемся по записи этого файла
// чтобы работал node необходимо установить node.js и npm
//Проверить установлены ли они можно в консоли написав 
// ADMIN@ADMIN-▒▒ MINGW64 ~
// $ node --version
// v5.10.1
// ADMIN@ADMIN-▒▒ MINGW64 ~
// $ npm --version
// 3.8.8

// Теперь рассмотрим код файла backend.js
// var express = require('express'); - это минифреймворк на node
// require говорит возьми пакет Express я его буду использовать
//var cors = require('cors'); - cors - для кроссдоменного запроса
//var bodyParser = require('body-parser');  body-parser - этот пакет нужен чтобы получить body post-запроса
// var app = express(); - это инициализация express сервера


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
  // extended: true
// }));- эта часть отвечает за настройки боди парсера


//app.use(cors()); - здесь мы указываем что наше приложение должно использовать cors


// Дальше у нас есть json массив books
// var books = [
  // {
    // name: 'AngularJS'
  // },
  // {
    // name: 'EmberJS'
  // },
  // {
    // name: 'ReactJS'
  // }
// ];

// сделаем get запрос
// app.get('/books', function (req, res) {
  // res.send(books);
// }); - тут написано что по запросу get localhost:3001/books будет отправлен объект books

//Далее 
// var server = app.listen(3001, function () {
  // console.log('backend started');
// }); - мы слушаем localhost на порту 3001 и выводим сообщение 'backend started'

//post - мы пока не используем поэтому закомментим его

//теперь попробуем запусть node.js через консоль 
//$ node backend.js
// он нам пишет что запустить не может и нам необходимо установить модули express cors body-parser
// устанавливаем в папке с проектом (cd папка с проектом) npm install express 
// далее тоже в папке с проектом npm install cors и npm install body-parser

//теперь запустим через консоль 
//$ node backend.js
// появится строка backend started

// И теперь если мы введем в адресную строку http://localhost:3001/books
// мы увидим json объект books [{"name":"AngularJS"},{"name":"EmberJS"},{"name":"ReactJS"}]


//Если мы обновим страницу нашего проекта открыв file:///C:/OpenServer/domains/angularjs-18/index.html
// и посмотрим в network all консоли то мы увидим books c запросом на http://localhost:3001/books
// и этот запрос вернул нам три объкта с нашими именами которые мы создали
// если же мы посмотрим в консоль то мы увидим надпись success и три объекта которые нам доступны в функции angular

// Еще раз как это работает?
// 
// app.get('/books', function (req, res) {
  // res.send(books);
// }); - backend.js по запросу /books возвращает нам с backend.js книжки
// на фронэнде в main.js на контроллере при помощи - 
   // $http.get('http://localhost:3001/books')
   // .success(function(result){
       // console.log('!', result);
   // })
   // .error(function(result) {
      // console.log('error');
   // }); - отправляем запрос  - ДАЙ НАМ ВСЕ КНИЖКИ - запрос сработал
   // отработала функция success - книжки успешно были получены и мы видим resul консоли
   
   //Теперь давайте заиджектим здесь кроме $http еще и $scope
   // допишем в success $scope.books = result;
   // выведем books в шаблоне 
   // в html 
     // <div ng-controller = "mainCtrl">
          // <div ng-repeat = "book in books">
              // {{book.name}}
          // </div>
      // </div> 
      
// если посмотрим в браузер то все книжки с бекэнда успешно вывелись
// Т.е. у нас уже есть полноценный сервер и информация с бекэнда успешно выводится во фронтэнд
// теперь давайте напишем POST запрос для этого мы добавим input
//<input type="text" ng-model = 'book.name' />
//<input type="button" ng-click = "addBook(book)" value="Add me new book please" />

// давайте напишем обработчик
// $scope.addBook = function(book){
 //   console.log(book);
//};
// посмотрим в браузер и увидим  - если мы введем что-то в инпут и нажмен на кнопку  то в консоле появится объект который мы ввели
// теперь этот объект мы хотим сохранить на бекэнд)
// для этого мы пишем post запрос в функцию-обработчик addBook
// $http.post('http://localhost:3001/books', book)
    // .success(function(result){
        // console.log('Book successfully saved to backend');
    // })
    // .error(function(result) {
        // console.log('Error in back post');
     // });
//   смотрим в браузер видим объект с введенным в инпут именем и 404 ошибку
// это потому что наш сервер не готов принять и обработать этот запрос 
// теперь в backend.js давайте раскоментируем кусочек кода post, который мы комментировали раньше
// app.post('/books', function (req, res) {
  // var book = {
    // name: req.body.name
  // };
  // books.push(book);
  // res.send(200);
// }); - res.send(200) -это означает что на этот запрос отдай 200 в знак того что у нас все хорошо и мы сохранили данные 
//books.push(book); это наш массив и мы в него пушим новый объект 
// name: req.body.name -  с помощью боди парсера мы с помощью body.name парсим  name из этого тела (т.е. грубо говоря мы прочитываем наш запрос и получаем name)
// чтобы все заработало нам необходимо перезапустить сервер на node
// останавливаем его и перезапускаем ctrl+c и node backend.js
// обновляем страницу добавляем запись и смотри консоль 
// у нас в консоле network all есть три записи books
// одна из них с Request Method:OPTIONS
// Что это такое?
// OPTIONS создан для того чтобы работал кроссдоменный запрос

// теперь поменяем front-end чтобы у нас добавлялись добавленные книги 
// добавляем строку в success $scope.books.push(book); - т.e. пушим в массив наш новый book
// и дальше пишем $scope.book = null;
// Зачем это делать?
//Это для того чтобы книга в нашем инпуте не была привязана
//и инпут очищался
// проверим  - все работает книги добавляются и при обновлении страницы выводятся все книги которые находятся в памяти работающего бэкэнд-сервера
// если перезапустим node то при старте страницы опять выведется только три книги...



var app = angular.module('app', []);

app.controller ('mainCtrl', function($http, $scope){

   
   $http.get('http://localhost:3001/books')
   .success(function(result){
       console.log('!', result);
       $scope.books = result;
    
       
   })
   .error(function(result) {
      console.log('error');
   });
   
   $scope.addBook = function(book){
    console.log(book);
    $http.post('http://localhost:3001/books', book)
    .success(function(result){
        console.log('Book successfully saved to backend');
        $scope.books.push(book);
        $scope.book = null;
    })
    .error(function(result) {
        console.log('Error in back post');
     });
   }; 
});










