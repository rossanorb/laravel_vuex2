<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Contrato;

class Email extends Mailable
{
    use Queueable, SerializesModels;

    private $contrato;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Contrato $contrato)
    {
        $this->contrato = $contrato;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        
        /************************************************************************
         *  Email não configurando então comentei aqui para não gerar erro.
         ************************************************************************/

        return $this->markdown('email')
                    ->subject('Notificação de Criação de Contrato')
                    ->with([
                        'contrato' => $this->contrato,
                    ]);
    }
}
