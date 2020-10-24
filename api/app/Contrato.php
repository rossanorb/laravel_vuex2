<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    protected $fillable = [
        'imovel_id', 'tipo_pessoa','documento','email','contratante'
    ];
}
