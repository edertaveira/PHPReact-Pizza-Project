<?php

namespace Tests\Feature;

use App\Product;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class FavoriteTest extends TestCase
{
    use RefreshDatabase;

    public function testListFavorites()
    {
        $user = factory(User::class)->create(['email' => 'user@testing.com']);
        $token = auth()->login($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->json('POST', '/api/favorite/list');

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'products']);
    }

    public function testListFavoritesUnAuthorized()
    {

        $response = $this->withHeaders(['Authorization' => ""])
            ->json('POST', '/api/favorite/list');

        $response->assertStatus(401);
    }

    public function testAddFavorite()
    {
        $user = factory(User::class)->create(['email' => 'user@testing.com']);
        $token = auth()->login($user);

        factory(Product::class)->create([
            'product_id' => 1,
            'title' => "Pizza with Banana",
            'price' => 18.00,
            'image' => ''
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->json('POST', '/api/favorite/add', ["product_id" => 1]);

        $response->assertStatus(200)
            ->assertJsonStructure(['success']);
    }

    public function testRemoveFavorite()
    {
        $user = factory(User::class)->create(['email' => 'user@testing.com']);
        $token = auth()->login($user);

        factory(Product::class)->create([
            'product_id' => 1,
            'title' => "Pizza with Banana",
            'price' => 18.00,
            'image' => ''
        ]);

        $this->withHeaders(['Authorization' => "Bearer $token"])
            ->json('POST', '/api/favorite/add', ["product_id" => 1]);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->json('POST', '/api/favorite/remove', ["product_id" => 1]);

        $response->assertStatus(200)
            ->assertJsonStructure(['success']);
    }
}
