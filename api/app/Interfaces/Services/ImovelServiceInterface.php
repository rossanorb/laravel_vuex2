<?php

namespace App\Interfaces\Services;

interface ImovelServiceInterface {

    public function index(array $imovel);
    public function create(array $imovel);
    public function destroy(int $id): void;
}