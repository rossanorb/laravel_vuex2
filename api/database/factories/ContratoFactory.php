<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Contrato;
use Faker\Generator as Faker;

$factory->define(Contrato::class, function (Faker $faker) {
    return [
        'tipo_pessoa' => false,
        'documento' => '58.753.089/0001-47',
        'email' => $faker->unique()->safeEmail,
        'contratante' => $faker->name,
    ];
});
