<?php

namespace Tests\Feature\Api\Blog;

use App\Infrastructure\Laravel\Models\Blog;
use App\Infrastructure\Laravel\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class BlogPrivateTest extends TestCase
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
    public function create_blog()
    {
        $data = [
            'name' => $this->blog->name,
            'description' => $this->blog->description
        ];

        $response = $this->postJson(route("blogs.store"), $data);


        $response->assertCreated();

        $response->assertJsonStructure([
            'status',
            'message',
            'data'
        ]);
        $response->assertJson([
            'data' => ['name' => $this->blog->name]
        ]);
        $this->assertDatabaseHas(
            'blogs',
            $this->blog->makeHidden(['id', 'created_at', 'updated_at'])->toArray()
        );
    }

    /** @test */
    public function update_blog()
    {
        $blog = Blog::factory()->create(['user_id' => $this->user->id]);
        $data = [
            'name' => $this->blog->name,
            'description' => $this->blog->description
        ];

        $response = $this->putJson(route("blogs.update", $blog), $data);

        $response->assertStatus(JsonResponse::HTTP_OK);
        $response->assertJsonStructure([
            'status',
            'message',
            'data'
        ]);
        $response->assertJson([
            'data' => ['name' => $this->blog->name]
        ]);
        $this->assertDatabaseHas(
            'blogs',
            $this->blog->makeHidden(['id', 'created_at', 'updated_at'])->toArray()
        );
    }

    /** @test */
    public function get_blog_by_id()
    {
        $blog = Blog::factory()->create(['user_id' => $this->user->id]);
        $response = $this->getJson(route("blogs.show", $blog));

        $response->assertOk();
        $response->assertJsonStructure([
            'status',
            'message',
            'data'
        ]);
        $response->assertJson([
            "status" => "success",
            "message" => "Blog show successful",
            'data' => $blog->makeHidden(['updated_at', 'created_at'])->toArray()
        ]);
    }

    /** @test */
    public function delete_by_id()
    {
        $blog = Blog::factory()->create();

        $response = $this->delete(route("blogs.destroy", $blog));

        $response->assertNoContent();
        $this->assertDatabaseMissing(
            'blogs',
            $blog->toArray()
        );
    }
}