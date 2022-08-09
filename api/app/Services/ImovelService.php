<?php

namespace App\Services;

use App\Interfaces\Services\ImovelServiceInterface;
use App\Interfaces\Repositories\ImovelRepositoryInterface;

class ImovelService implements ImovelServiceInterface {

    private $imovelRepository;

    public function __construct(ImovelRepositoryInterface $imovelRepository) {
        $this->imovelRepository = $imovelRepository;
    }    

    public function index(array $imovel)
    {
    }

    public function create(array $imovel)
    {
        $createdImovel = $this->imovelRepository->save($imovel);
        return $createdImovel;
    }

    public function destroy(int $id): void 
    {

    }

}