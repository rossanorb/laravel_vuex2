<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Imovel;
use Faker\Generator as Faker;

$factory->define(Imovel::class, function (Faker $faker) {
    return [
        'email' => $faker->unique()->safeEmail,
        'rua' => $faker->streetName,
        'bairro' => 'Jardim Santo Antônio',
        'cidade' => 'São Paulo',
        'estado' => 'SP',
        'numero' => $faker->unique()->randomNumber,
        'complemento' => 'complemento'
    ];
});
