<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Imovel;

class ImovelTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testCreate(){
        $data = factory(\App\Imovel::class)->make()->toArray();

        $param = [
            'status' => true,
            'result' =>  $data,
            'errors' => []
        ];        
        
        $response = $this->json('POST', 'api/imoveis', $data);
        $response->assertStatus(201)->assertJson($param);

        \App\Imovel::getQuery()->delete();
    }

    public function testValidacaoEmail(){
        $data = factory(\App\Imovel::class)->make([
            'email' => ''
        ])->toArray();

        $param = [
            'status' => false,
            'result' =>  '',
            'errors' => [
                'email' => [
                        'O campo email é obrigatório.'
                    ]
                ]
        ];        
        
        $response = $this->json('POST', 'api/imoveis', $data);
        $response->assertStatus(422)->assertJson($param);

        \App\Imovel::getQuery()->delete();
    }    

    public function testDelete(){
        $model = factory(\App\Imovel::class)->create();
        $response = $this->json('DELETE', '/api/imoveis/'.$model->id);
        $response->assertStatus(204);

        \App\Imovel::getQuery()->delete();
    } 


}
