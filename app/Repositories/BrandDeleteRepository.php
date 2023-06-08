<?php

namespace App\Repositories;

use App\Models\Brand;
use Carbon\Carbon;

class BrandDeleteRepository
{
    public static function delete($id)
    {
        return Brand::destroy($id);
    }

    public static function softDelete($id)
    {
        $now = Carbon::now()->timestamp;
        $brandInstance = Brand::find($id);
        $brandInstance->status = 'deleted';
        $brandInstance->deleted_at = $now;
        return $brandInstance->save();
    }
}
