<?php

namespace Tests\Feature;

use App\Product;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function testNewOrderSuccess()
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
            ->json('POST', '/api/order/new', [
                "order" => [
                    "total" => 18.00,
                    "products" => array(
                        [
                            "product_id" => 1,
                            "amount" => 1,
                            "price" => 18.00,
                        ]
                    )
                ],
                "address" => "Address Test",
                "district" => "District Test",
                "number" => "100",
                "complement" => "Complement Test"
            ]);
        $response
            ->assertStatus(200)
            ->assertJsonStructure(['success']);
    }

    public function testListUserOrders()
    {
        $user = factory(User::class)->create(['email' => 'user@testing.com']);
        $token = auth()->login($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->json('POST', '/api/order/list');

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'orders']);
    }

    public function testNewOrderFailed()
    {
        $user = factory(User::class)->create(['email' => 'user@testing.com']);
        $token = auth()->login($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->json('POST', '/api/order/new', []);
        $response
            ->assertStatus(401)
            ->assertJsonStructure(['error']);
    }

    public function testNewOrderUnauthorized()
    {
        $response = $this->withHeaders(['Authorization' => ""])
            ->json('POST', '/api/order/new', []);
        $response
            ->assertStatus(401);
    }
}
