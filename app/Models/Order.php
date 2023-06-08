<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'phone_number',
        'product_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function productCopy()
    {
        return $this->belongsTo(ProductCopy::class);
    }
}
