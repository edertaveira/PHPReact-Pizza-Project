<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        return Product::all()->toJson();
    }


    public function store(Request $request)
    {
    }

    public function show(Request $request)
    {
        $input = $request->all();
        $id = $input->id;

        $products = Product::all();
        $product = $products->find($id);
        return $product;
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
