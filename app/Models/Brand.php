<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'prefix',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = ['prefix' => 'array'];

    public function product()
    {
        return $this->hasMany(Product::class);
    }

    public function productCopy()
    {
        return $this->hasMany(ProductCopy::class);
    }
}
