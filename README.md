##### Teste Full Stack Laravel
Aplicação em Laravel 5.8 com vue/vuex

##### Requisitos
- PHP 7.1+
- Laravel (Preferência 5.8+)
- Vue.JS
- Docker Engine

##### Orientações
- Aplicação backend está na pasta api
- Aplicação front-end (SPA) está na pasta front

- Rodar php artisan migrate no container test-app

- Para rodar testes:
- Acessar container docker php e rodar o seguinte comando:

./vendor/bin/phpunit --debug --verbose --color


- Acessar aplicação pela url http://localhost


- JOBS

- Quando novo contrato é criado um email é posto em uma fila. Para disparar a fila execute no terminal:

php artisan queue:work --once