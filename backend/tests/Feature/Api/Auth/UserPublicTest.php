<?php

namespace Tests\Feature\Api\Auth;

use App\Infrastructure\Laravel\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserPublicTest extends TestCase
{
    use RefreshDatabase;

    private $password;
    private $user;


    public function setUp(): void
    {
        parent::setUp();
        $this->seed();

        $this->password = 'Lol123Lol@';
        $this->user = User::factory()->create(['password' => Hash::make($this->password)]);
    }

    /** @test */
    public function register()
    {
        $user = User::factory()->make();
        $data = [
            "name" => $user->name,
            "last_name" => $user->last_name,
            "email" => $user->email,
            "identification" => $user->identification,
            "cell_phone" => $user->cell_phone,
            "city" => $user->city,
            "address" => $user->address,
            "city_register" => $user->city_register,
            "is_manager" => $user->is_manager,
            "is_signer" => $user->is_signer,
            "is_verified" => $user->is_verified,
            "password" => "Lol123Lol@",
            "password_confirmation" => "Lol123Lol@"
        ];

        $response = $this->postJson(route('register'), $data);

        $response->assertCreated();
        $response->assertJsonStructure(['status', 'message', 'user', 'authorization']);
        $this->assertDatabaseHas(
            'users',
            $user->makeHidden(['id'])->toArray()
        );
    }

    /** @test */
    public function login()
    {
        $credentials = [
            'email' => $this->user->email,
            'password' => $this->password,
        ];

        $response = $this->postJson(route('login'), $credentials);
        $response->json();

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'message', 'user', 'authorization']);
        $this->assertTrue(Auth::check());
    }

    /**
     * @test
     */
    public function login_credentials_invalid()
    {
        $this->withoutExceptionHandling();

        $validatedField = 'email';
        $brokenRule = 'test@test.com';
        $validatedField1 = 'password';
        $brokenRule1 = 'secret';

        $credentials = [$validatedField => $brokenRule, $validatedField1 => $brokenRule1];

        $response = $this->postJson(
            route('login'),
            $credentials
        );

        $response->assertStatus(JsonResponse::HTTP_UNAUTHORIZED);
        $response->assertExactJson([
            'status' => 'error',
            'message' => 'Unauthorized'
        ]);
    }

    /** @test */
    public function refresh_without_token()
    {
        $response = $this->postJson(route('refresh'));

        $response->assertExactJson([
            'status' => 'error',
            "message" => "Authorization Token not found"
        ]);

        $response->assertUnauthorized();
    }

    /** @test */
    public function refresh_with_invalid()
    {
        $token_fake = "token_invalid";
        $this->withHeader("Authorization", "Bearer {$token_fake}");

        $response = $this->postJson(route('refresh'));

        $response->assertExactJson([
            "status" => "error",
            "message" => "Token is Invalid"
        ]);
        $response->assertUnauthorized();
    }
}
