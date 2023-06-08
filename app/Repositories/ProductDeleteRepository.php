<?php

namespace App\Repositories;

use App\Models\Product;
use Carbon\Carbon;

class ProductDeleteRepository
{
    public static function delete($id)
    {
        return Product::destroy($id);
    }

    public static function softDelete($id)
    {
        $now = Carbon::now()->timestamp;
        $product = Product::find($id);
        $product->deleted_at = $now;
        return $product->save();
    }
}
