<?php

namespace App\Http\Controllers;

use App\Product;
use App\User;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $cuser = User::with("products")->where("user_id", $user->user_id)->get();
        $products = isset($cuser[0]) ? $cuser[0]["products"] : [];
        return response()->json(["success" => true, "products" => $products]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $cuser = User::find($user->user_id);
        $cproduct = Product::find($request->get("product_id"));
        $cuser->products()->save($cproduct);
        return response()->json(["success" => true]);
    }

    public function destroy(Request $request)
    {
        $user = auth()->user();
        $cuser = User::find($user->user_id);
        $cproduct = Product::find($request->get("product_id"));
        $cuser->products()->detach($cproduct);
        return response()->json(["success" => true]);
    }
}
