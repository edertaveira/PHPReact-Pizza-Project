<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product')->insert([
            'image' => "banana.png",
            'title' => "Pizza with Banana",
            'price' => 19.00,
        ]);

        DB::table('product')->insert([
            'image' => "4cheese.png",
            'title' => "Pizza with Cheese",
            'price' => 18.00,
        ]);

        DB::table('product')->insert([
            'image' => "calabresa.png",
            'title' => "Pizza with Calabresa",
            'price' => 18.00,
        ]);

        DB::table('product')->insert([
            'image' => "chocollate.png",
            'title' => "Pizza with Chocollate",
            'price' => 21.00,
        ]);

        DB::table('product')->insert([
            'image' => "frango.png",
            'title' => "Pizza with Chicken",
            'price' => 19.00,
        ]);

        DB::table('product')->insert([
            'image' => "margueritta.png",
            'title' => "Marguerita Pizza",
            'price' => 20.00,
        ]);

        DB::table('product')->insert([
            'image' => "peperonni.png",
            'title' => "Peperonni",
            'price' => 22.00,
        ]);

        DB::table('product')->insert([
            'image' => "portuguese.png",
            'title' => "Portuguese Pizza",
            'price' => 21.00,
        ]);


        DB::table('seeting')->insert([
            'costs' => 5.00,
        ]);
    }
}
