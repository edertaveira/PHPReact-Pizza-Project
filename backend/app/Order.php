<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order';
    protected $primaryKey = 'order_id';

    public function products()
    {
        return $this->belongsToMany('App\Product', 'order_product', 'order_id', 'product_id')
            ->withPivot('amount', 'price', 'total');
    }

    public function address()
    {
        return $this->hasOne('App\Address');
    }
}
