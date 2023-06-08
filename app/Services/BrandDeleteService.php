<?php

namespace App\Services;

use App\Repositories\BrandDeleteRepository;

class BrandDeleteService
{
    public static function delete($id)
    {
        return BrandDeleteRepository::delete($id);
    }

    public static function softDelete($id)
    {
        return BrandDeleteRepository::softDelete($id);
    }
}
