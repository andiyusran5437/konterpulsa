<?php

namespace App\Services;

use App\Models\Order;
use App\Repositories\OrderFindRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderFindService
{
    public static function find(Request $req)
    {
        $perPage = $req->input('per_page', '10');
        $search = $req->query('search');
        $sort = $req->query('sort', 'desc');
        $status = $req->query('status');
        $phone = $req->query('phone');
        $perPage = intval($perPage);

        return OrderFindRepository::find(perPage: $perPage, phone: $phone, sort: $sort, status: $status, search: $search);
    }

    public static function findOne($id)
    {
        return OrderFindRepository::findOne($id);
    }

    public static function count($status): int
    {
        return OrderFindRepository::count($status);
    }
}
