<?php
namespace App\Http\Services;

use Illuminate\Http\Request;
use \App\Contrato;
use \App\Imovel;

class ContratoValidatorService {

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
                
        if($request['tipo_pessoa']){ // CPF  
            $regex_documento = "^\d{3}\.\d{3}\.\d{3}\-\d{2}$";
        }else{            
            $regex_documento = '^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$'; //CNPJ
        }

        switch($action){
            case 'store' :

                $imovel = Imovel::find($request['imovel_id']);
                if(!$imovel instanceof Imovel ){
                    $this->setError(['imovel' => 'O imóvel não existe']);
                    return true;
                }

                if($imovel->contrato()->count() > 0){
                    $this->setError(['imovel' => 'O imóvel já possui contrato']);
                    return true;                                        
                }

                $rules = [
                    'tipo_pessoa' => 'required',
                    'documento' => "required|string|max:20|regex:/{$regex_documento}/",
                    'email' => 'required|string|max:30|email:rfc',                    
                    'contratante' => 'required|string|max:50'                    
                ];
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