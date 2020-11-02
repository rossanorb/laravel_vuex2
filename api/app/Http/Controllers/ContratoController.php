<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\ApiService;
use App\Http\Services\ContratoValidatorService;
use App\Contrato;

class ContratoController extends Controller
{

    public function __construct( ApiService $apiService, ContratoValidatorService $validatorService ) {
        $this->apiService = $apiService;
        $this->validatorService = $validatorService;
    }

    public function store( Request $request ) {
        $request = $request->all();        

        $request['imovel_id'] = array_key_exists("propriedade", $request) ? $request['propriedade'] : null;                

        if ( $this->validatorService->fails( $request, 'store' ) ) {
            $this->apiService->setErrors( $this->validatorService->getErrors() );
            return $this->apiService->response( 422 );
        }

        $request['tipo_pessoa'] = filter_var($request['tipo_pessoa'], FILTER_VALIDATE_BOOLEAN);        

        try {

            $this->apiService->setResult( Contrato::create( $request ) );
            $this->apiService->setStatus( true );
            return $this->apiService->response( 201 );

        } catch ( \Exception $e ) {
            return $this->error( $e );
        }       

    }

    private function error( $e ) {
        \Log::error( $e->getMessage() );
        $this->apiService->setErrors( [
            'message' => '( ＾皿＾)っ Something went wrong!',
            'description' => $e->getMessage()
        ] );
        return $this->apiService->response( 500 );
    }    
}
