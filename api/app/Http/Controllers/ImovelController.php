<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\ApiService;
use App\Http\Services\ImovelValidatorService;
use App\Imovel;

class ImovelController extends Controller
{
    private $apiService;
    private $validatorService;

    private $order = ['email','rua'];
    private $by = ['asc', 'desc'];

    public function __construct( ApiService $apiService, ImovelValidatorService $validatorService ) {
        $this->apiService = $apiService;
        $this->validatorService = $validatorService;
    }

    public function index( Request $request ) {
        $request = $request->all();        

        $order = $request['order'] ?? 'id';
        $by = $request['by'] ?? 'asc';
        $like = $request['like'] ?? null;
        $limit = $request['limit'] ?? 100;

        if(!\in_array( $order, $this->order)){
            $order = 'id';
        }
        
        if(!\in_array( $by, $this->by)){
            $by = 'asc';
        }

        $result = Imovel::with('contrato')->orderBy($order, $by)->paginate($limit);
        $this->apiService->setResult($result);
        $this->apiService->setStatus(true);
        return $this->apiService->response();

    }

    public function store( Request $request ) {
        $request = $request->all();

        if ( $this->validatorService->fails( $request, 'store' ) ) {
            $this->apiService->setErrors( $this->validatorService->getErrors() );
            return $this->apiService->response( 422 );
        }        

        try {

            $this->apiService->setResult( Imovel::create( $request ) );
            $this->apiService->setStatus( true );
            return $this->apiService->response( 201 );

        } catch ( \Exception $e ) {
            return $this->error( $e );
        }
    }

    public function destroy($id)
    {
        try {
            $imovel = Imovel::find($id);            
            if(!$imovel instanceof Imovel){
                return $this->apiService->response(404);
            }

            $imovel->delete();
            return $this->apiService->response(204);

        } catch (\Exception $e) {
            return $this->error($e);
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
