<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImovelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Imovel::class, 50)->create();
    }
}
