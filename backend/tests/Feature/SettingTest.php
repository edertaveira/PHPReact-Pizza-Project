<?php

namespace Tests\Feature;

use App\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class SettingTest extends TestCase
{
    use RefreshDatabase;

    public function testGetSetting()
    {
        $response = $this->post('/api/setting/get');
        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'setting']);
    }
}
