<?php

namespace Tests\Feature\Api\Blog;

use App\Infrastructure\Laravel\Models\Blog;
use App\Infrastructure\Laravel\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class BlogPublicTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /** @test */
    public function list_blogs()
    {
        $response = $this->getJson(route("blogs.index"));

        $response->assertJsonStructure([
            'status',
            'message',
            'data'
        ]);

        $response->assertStatus(JsonResponse::HTTP_OK);
    }

    /** @test */
    public function error_token()
    {
        $blog = Blog::factory()->create();
        $response = $this->getJson(route('blogs.show', $blog));
        $response->assertExactJson(
            [
                "status" => "error",
                "message" => "Authorization Token not found"
            ]
        );

    }
}
