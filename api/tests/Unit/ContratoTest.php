<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Contrato;
use App\Imovel;

class ContratoTest extends TestCase
{
    public function testCreate(){

        $imovel = Imovel::create([
            'email' => 'filipeese@gmail.com.br',
            'rua' => 'Rua Domingo Barbosa Aguiar',
            'bairro' => 'Parque Alto da Boa Vista',
            'cidade' => 'Lins',
            'estado' => 'SP',
            'numero' => '824',
            'complemento' => 'Apartamento 158'
        ]);
        
        $data = factory(\App\Contrato::class)->make([
            'propriedade' => $imovel->id
        ])->toArray();

        $param = [
            'status' => true,
            'result' =>  $data,
            'errors' => []
        ];        
        
        $response = $this->json('POST', 'api/contratos', $data);
        $response->assertStatus(201);

        Contrato::truncate();
        \App\Imovel::getQuery()->delete();
        
    }
}
