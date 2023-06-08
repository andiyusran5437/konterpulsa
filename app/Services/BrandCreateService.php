<?php

namespace App\Services;

use App\Repositories\BrandCreateRepository;
use Illuminate\Support\Facades\Log;

class BrandCreateService
{
    public static function create($data)
    {
        $brand = $data['brand'];
        $prefix = $data['prefix'];

        BrandCreateRepository::create(brand: $brand, prefix: $prefix);
    }

    public static function update($id, $data)
    {
        $brand = $data['brand'];
        $prefix = $data['prefix'];

        BrandCreateRepository::update(id: $id, brand: $brand, prefix: $prefix);
    }

    public static function statusUpdate($id, $data)
    {
        $status = $data['status'];

        BrandCreateRepository::statusUpdate(id: $id, status: $status);
    }
}
