<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Imovel;
use Faker\Generator as Faker;

$factory->define(Imovel::class, function (Faker $faker) {
    $neighborhood = [
        'Sé Bela Vista',
        'Bom Retiro',
        'Cambuci',
        'Consolação',
        'Liberdade',
        'República',
        'Santa Cecília',
        'Sé',
        'Aricanduva',
        'Santo Amaro',
        'Moema',
        'Vila Mariana',
        'Vila Andrade',
        'Tucuruvi',
        'Brasilândia',
        'Anhanguera',
        'Butantã',
        'Rio Pequeno',
        'Pinheiros',
        'Jardim Paulista',
        'Jaraguá'
    ];

    return [
        'email' => $faker->unique()->safeEmail,
        'rua' => $faker->streetName,
        'bairro' => $neighborhood[rand(0, 20)],
        'cidade' => 'São Paulo',
        'estado' => 'SP',
        'numero' => $faker->unique()->randomNumber,
        'complemento' => $faker->secondaryAddress
    ];
});
