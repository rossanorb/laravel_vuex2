##### Teste Full Stack Laravel
Aplicação em Laravel 5.8 com Swoole
vue 2/vuex


##### Requisitos
- PHP 7.1+
- Laravel (Preferência 5.8+)
- Vue.JS
- Docker Engine

##### Orientações
- Aplicação backend está na pasta api
- Aplicação front-end (SPA) está na pasta front

- Rodar Migrations:

    docker exec app php artisan migrate

- Rodar Migrations & Seeeder:

    docker exec app php artisan migrate:refresh --seed    

- Para rodar testes:
- Acessar container docker php e rodar o seguinte comando:

     ./vendor/bin/phpunit --debug --verbose --color

- ou com o container rodando executar no terminal

    docker exec app ./vendor/bin/phpunit --debug --verbose --color

- Rodar o comando abaixo se falhar ao carregar alguma classe
    docker exec app php composer dumpautoload


- Acessar aplicação pela url http://localhost


- JOBS

- Quando novo contrato é criado um email é posto em uma fila. Para disparar a fila execute no terminal:

php artisan queue:work --once