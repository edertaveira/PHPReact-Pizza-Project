<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return "Test";
});

Route::prefix('api')->group(function () {
    Route::get('product/list', 'ProductController@index');
    Route::get('product/{id}', 'ProductController@show');
    Route::post('order/new', 'OrderController@store');

});