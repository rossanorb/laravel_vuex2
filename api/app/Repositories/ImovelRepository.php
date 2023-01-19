<?php

namespace App\Repositories;
use App\Imovel;

use App\Interfaces\Repositories\ImovelRepositoryInterface;

class ImovelRepository implements ImovelRepositoryInterface
{
    public function save(array $imovel): Imovel
    {
        $createdImovel = Imovel::create( $imovel );
        if($createdImovel instanceof Imovel){
            return $createdImovel;
        }
        
        return new Imovel();
    }
}