<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Order;

class Address extends Model
{
    protected $table = 'address';
    protected $primaryKey = 'address_id';
    public $timestamps = false;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
