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

    public function __construct(ApiService $apiService, ImovelValidatorService $validatorService){
        $this->apiService = $apiService;
        $this->validatorService = $validatorService;
    }

    public function store(Request $request)
    {
        $request = $request->all();

        if($this->validatorService->fails($request, 'store')) {
            $this->apiService->setErrors($this->validatorService->getErrors());
            return $this->apiService->response(422);
        };

        try {            
            $this->apiService->setResult(Imovel::create($request));
            $this->apiService->setStatus(true);
            return $this->apiService->response(201);

        } catch (\Exception $e) {
            return $this->error($e);
        }
    }

    private function error($e)
    {
        \Log::error($e->getMessage());
        $this->apiService->setErrors([
            'message' => '( ＾皿＾)っ Something went wrong!',
            'description' => $e->getMessage()
        ]);
        return $this->apiService->response(500);
    }    
}
