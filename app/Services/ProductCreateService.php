<?php

namespace App\Services;

use App\Repositories\ProductCreateRepository;

class ProductCreateService
{
    public static function create($requestData)
    {
        $credit = $requestData['credit'];
        $price = $requestData['price'];
        $brandId = $requestData['brand_id'];
        $stock = $requestData['stock'];

        return ProductCreateRepository::create(credit: $credit, price: $price, stock: $stock, brandId: $brandId);
    }

    public static function update($id, $requestData)
    {
        $credit = $requestData['credit'];
        $price = $requestData['price'];
        $brandId = $requestData['brand_id'];
        $stock = $requestData['stock'];

        return ProductCreateRepository::update(id: $id, credit: $credit, price: $price, stock: $stock, brandId: $brandId);
    }

    public static function statusUpdate($id, $requestData)
    {
        $status = $requestData['status'];

        return ProductCreateRepository::statusUupdate(id: $id, status: $status);
    }
}
