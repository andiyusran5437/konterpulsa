<?php

namespace App\Repositories;

use App\Models\Brand;
use Illuminate\Support\Facades\Log;

class BrandFindRepository
{
    public static function find($perPage, $sort, $status, $search)
    {
        $query = Brand::where(function ($q) use ($search) {
            $q->where('brand_id', 'LIKE', '%' . $search . '%')
                ->orWhere('name', 'LIKE', '%' . $search . '%')
                ->orWhereJsonContains('prefix', $search);
        });

        if (!empty($status) && $status != 'none') {
            $query->where('status', $status);
        }


        $query = $query->orderBy('created_at', $sort);
        $brands = $query->paginate($perPage);
        return $brands;
    }
}
