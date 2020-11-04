<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\Email;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Contrato;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $contrato;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Contrato $contrato)
    {
        $this->contrato = $contrato;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {   
      
        /************************************************************************
         *  Email não configurando então comentei aqui para não gerar erro.
         ************************************************************************/

        \Log::info("Envio notificação de novo contrato para {$this->contrato['email']}");
        // Mail::to($this->contrato['email'])
        //         ->send(new Email($this->contrato));
    }
}
