<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductFindRepository
{
    public static function findOne($id)
    {
        return Product::with('brand')
            ->where('products.id', $id)
            ->first();
    }

    public static function find($perPage, $prefix, $sort, $status, $search)
    {
        $query = Product::with('brand');
        if (!empty($prefix)) {
            $query->whereHas('brand', function ($q) use ($prefix) {
                $q->whereJsonContains('prefix', $prefix);
            });
        } else {
            $query->where(function ($q) use ($search) {
                $q->where('product_id', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('brand', function ($q) use ($search) {
                        $q->where('brand_id', 'LIKE', '%' . $search . '%')
                            ->orWhere('name', 'LIKE', '%' . $search . '%')
                            ->orWhereJsonContains('prefix', $search);
                    });
            });
        }

        if (!empty($status) && $status == 'sold') {
            $query->where('status', $status);
            $query->where('stock', '<=', 0);
        } elseif (!empty($status) && $status != 'none') {
            $query->where('status', $status);
        }

        $query->whereHas('brand', function ($q) {
            $q->where('status', 'active');
        });

        $query = $query->orderBy('created_at', $sort);
        $products = $query->paginate(perPage: $perPage);
        return $products;
    }
}
