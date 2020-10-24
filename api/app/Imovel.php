<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Imovel extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'email', 'rua','bairro','cidade','estado'
    ];
}
