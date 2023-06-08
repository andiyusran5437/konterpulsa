<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCopy extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'brand_id',
        'product_id',
        'credit',
        'price',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
