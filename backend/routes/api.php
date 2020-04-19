<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('me', 'AuthController@me');
});

Route::group(['middleware' => 'api', 'prefix' => 'user'], function ($router) {
    Route::post('register', 'UserController@store');
    Route::post('show', 'UserController@show');
});

Route::group(['middleware' => 'api', 'prefix' => 'product'], function ($router) {
    Route::post('list', 'ProductController@index');
    Route::post('show', 'ProductController@show');
});

Route::group(['middleware' => 'api', 'prefix' => 'order'], function ($router) {
    Route::post('new', 'OrderController@store');
    Route::post('byUser', 'OrderController@byUser');
});
