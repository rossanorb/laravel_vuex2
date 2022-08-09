<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\Services\ImovelServiceInterface;
use App\Interfaces\Repositories\ImovelRepositoryInterface;
use App\Services\ImovelService;
use App\Repositories\ImovelRepository;

class ImovelProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ImovelServiceInterface::class, ImovelService::class);
        $this->app->bind(ImovelRepositoryInterface::class, ImovelRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
