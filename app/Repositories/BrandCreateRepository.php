<?php

namespace App\Repositories;

use App\Models\Brand;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class BrandCreateRepository
{
    public static function create($brand, $prefix)
    {
        $now = Carbon::now()->timestamp;
        $brandInstance = new Brand();
        $brandInstance->brand_id = $now;
        $brandInstance->name = $brand;
        $brandInstance->prefix = $prefix;
        $brandInstance->created_at = $now;
        $brandInstance->save();
    }

    public static function update($id, $brand, $prefix)
    {
        $now = Carbon::now()->timestamp;
        $brandInstance = Brand::find($id);
        $brandInstance->name = $brand;
        $brandInstance->prefix = $prefix;
        $brandInstance->updated_at = $now;
        $brandInstance->save();
    }

    public static function statusUpdate($id, $status)
    {
        $now = Carbon::now()->timestamp;
        $brandInstance = Brand::find($id);
        $brandInstance->status = $status;
        if ($status != 'deleted') {
            $brandInstance->updated_at = $now;
            $brandInstance->deleted_at = null;
        } else {
            $brandInstance->deleted_at = $now;
        }
        $brandInstance->save();
    }
}
