<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testRequiresEmailAndLogin()
    {
        $response = $this->json('POST', '/api/auth/login', [
            'email' => "",
            'password' => ""
        ]);
        $response
            ->assertStatus(200)
            ->assertJsonStructure(['error']);
    }

    public function testUserRegisterSuccess()
    {
        $email = Config::get('api.apiEmail');
        $password = Config::get('api.apiPassword');

        $response = $this->post('/api/user/register', [
            'name' => "Test Name",
            'email' => $email,
            'password' => $password,
            'c_password' => $password
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure(['success', 'token', 'user']);
    }

    public function testUserLoginSuccess()
    {
        $user = factory(User::class)->create([
            'email' => Config::get('api.apiEmail'),
            'password' => bcrypt(Config::get('api.apiPassword')),
        ]);

        $response = $this->json('POST', '/api/auth/login', [
            'email' => Config::get('api.apiEmail'),
            'password' => Config::get('api.apiPassword')
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);
    }

    public function testUserLoginFailed()
    {

        $user = factory(User::class)->create([
            'email' => Config::get('api.apiEmail'),
            'password' => bcrypt(Config::get('api.apiPassword')),
        ]);

        $response = $this->json('POST', '/api/auth/login', [
            'email' => Config::get('api.apiEmail'),
            'password' => "wrongPassword"
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure(['error']);
    }
}
