<?php

namespace App\Infrastructure\Laravel\Providers;

use App\Application\Auth\AuthUser;
use App\Application\Auth\Contracts\AuthUserInterface;
use App\Domain\Blog\BlogRepositoryInterface;
use App\Domain\User\UserRepositoryInterface;
use App\Infrastructure\Blog\BlogRepository;
use App\Infrastructure\User\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(AuthUserInterface::class, AuthUser::class);
        $this->app->bind(BlogRepositoryInterface::class, BlogRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
