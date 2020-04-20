<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address', function (Blueprint $table) {
            $table->bigIncrements('address_id')->autoIncrement();
            $table->string('address', 200);
            $table->text('complement')->nullable();
            $table->string('district', 100);
            $table->smallInteger('number');
            $table->bigInteger('order_id')->unsigned();
            $table->foreign('order_id')->references('order_id')->on('order');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('address');
    }
}
