<?php

namespace App\Services;

use App\Models\Brand;
use App\Repositories\BrandFindRepository;

class BrandFindService
{
    public static function find($req)
    {
        $perPage = $req->input('per_page', '10');
        $perPage = intval($perPage);
        $sort = $req->input('sort', 'desc');
        $status = $req->input('status');
        $search = $req->input('search');
        return BrandFindRepository::find(perPage: $perPage, sort: $sort, status: $status, search: $search);
    }
}
