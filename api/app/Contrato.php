<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    protected $fillable = [
        'propriedade', 'tipo_pessoa','documento','email','contratante'
    ];
}
