<?php

namespace Tests\Feature\Api\Auth;

use App\Infrastructure\Laravel\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserPrivateTest extends TestCase
{
    use RefreshDatabase;

    private $user;
    private $token;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed();
        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
    }

    /** @test */
    public function logout_manuallity()
    {
        $this->withHeader('Authorization', "Bearer {$this->token}");

        $response = $this->postJson(route('logout'));

        $response->assertExactJson([
            'status' => 'success',
            'message' => 'Successfully logged out'
        ])
        ->assertStatus(200);
    }

    /** @test */
    public function logout()
    {
        $password = 'Lol123Lol@';
        $user = User::factory()->create(['password' => Hash::make($password)]);
        $credentials = [
            'email' => $user->email,
            'password' => $password
        ];

        $response = $this->postJson(route('login'), $credentials);
        $token = $response['authorization']['token'];
        $this->withHeader('Authorization', "Bearer {$token}");

        $response = $this->postJson(route('logout'));

        $response->assertExactJson([
            'status' => 'success',
            'message' => 'Successfully logged out'
        ])
        ->assertStatus(200);
    }

    /** @test */
    public function refresh()
    {
        $this->withHeader('Authorization', "Bearer {$this->token}");

        $response = $this->postJson(route('refresh'));

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'message', 'user', 'authorization']);
        $this->assertNotEquals($this->token, $response['authorization']['token']);
    }
}
