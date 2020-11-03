<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Imovel;
use App\Contrato;

class IntegracaoTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testContrato(){
        // cadastra imovel
        $data = factory(\App\Imovel::class)->make()->toArray();
        $param = [
            'status' => true,
            'result' =>  $data,
            'errors' => []
        ];        
        $response = $this->json('POST', 'api/imoveis', $data);
        $response->assertStatus(201)->assertJson($param);

        // recupera id do imovel
        $imovel =\App\Imovel::orderby('id','desc')->limit(1)->first();

        //cria contrato
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

        // testa se já possui contrato
        $response = $this->json('POST', 'api/contratos', $data);
        $response->assertStatus(422);

        Contrato::truncate();
        \App\Imovel::getQuery()->delete();        
                
    }
}
