<?php

namespace Tests\Unit\Http\Requests;

use App\Infrastructure\Laravel\Models\Blog;
use App\Infrastructure\Laravel\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class BlogRequestTest extends TestCase
{

    use RefreshDatabase;

    private $user;
    private $token;
    private $blog;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
        $this->blog = Blog::factory()->make(['user_id' => $this->user->id]);

        $this->withHeader('Authorization', "Bearer {$this->token}");
    }


    /** @test */
    public function register_with_errors_fields()
    {
        $user = User::factory()->make(['name' => null, 'description' => null]);
        $data = [
            "name" => $user->name,
            "description" => $user->description,
        ];

        $response = $this->postJson(route('blogs.store'), $data);

        $response->assertJsonValidationErrors(['name', 'description']);
    }
}
