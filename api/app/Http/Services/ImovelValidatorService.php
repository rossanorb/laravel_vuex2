<?php
namespace App\Http\Services;

use Illuminate\Http\Request;
use \App\Imovel;

class ImovelValidatorService {

    private $errors;

    private function setError($errors)
    {
        $this->errors = $errors;
    }

    public function getErrors()
    {
        return $this->errors;
    }

    public function fails($request, $action){
        $rules = [];

        switch($action){
            case 'store' :                
                $rules = [
                    'email' => 'required|string|max:30|email:rfc|',
                    'rua' => 'required|string|max:50',
                    'bairro' => 'required|string|max:50',
                    'cidade' => 'required|string|max:50',
                    'estado' => 'required|string|max:2',
                ];
                break;
            case 'update' :
                break;
        }

        $validator = \Validator::make($request, $rules );

        if ($validator->fails()) {
            $this->setError($validator->errors());
            return true;
        }
        
        return false;
    }
}