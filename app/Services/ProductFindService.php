<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductFindRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductFindService
{
    public static function findOne($id)
    {
        return ProductFindRepository::findOne($id);
    }

    public static function find(Request $req)
    {
        $perPage = $req->input('per_page', '10');
        $perPage = intval($perPage);
        $sort = $req->input('sort', 'desc');
        $prefix = $req->input('prefix');
        $status = $req->input('status');
        $search = $req->input('search');

        return ProductFindRepository::find(perPage: $perPage, prefix: $prefix, sort: $sort, status: $status, search: $search);
    }
}
