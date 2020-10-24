<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Imovel extends Model
{
    use SoftDeletes;
    protected $table = 'imoveis';
    
    protected $fillable = [
        'email', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado'
    ];

    public function contrato(){
        return $this->hasOne(Contrato::class);
    }
}
