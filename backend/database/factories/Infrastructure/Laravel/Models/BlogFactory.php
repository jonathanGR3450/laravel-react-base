<?php

namespace Database\Factories\Infrastructure\Laravel\Models;

use App\Domain\Blog\ValueObjects\Id;
use App\Infrastructure\Laravel\Models\Blog;
use App\Infrastructure\Laravel\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class BlogFactory extends Factory
{
    /**
     * The name of the factory's corresponding model. * * @var string
     */
    protected $model = Blog::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user = User::get()->first();
        return [
            'id' => Id::random()->value(),
            'name' => fake()->name(),
            'description' => fake()->text(),
            'user_id' => $user->id
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
