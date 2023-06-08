<?php

namespace App\Repositories;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class OrderFindRepository
{
    public static function find($perPage, $phone, $sort, $status, $search)
    {
        $query = Order::with('productCopy.brand');
        if (!empty($phone)) {
            $query->where('phone_number', $phone);
        } else {
            $query->where(function ($q) use ($search) {
                $q->where('order_id', 'LIKE', '%' . $search . '%')
                    ->orWhere('phone_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('va', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('productCopy', function ($q) use ($search) {
                        $q->whereHas('brand', function ($q) use ($search) {
                            $q->where('name', 'LIKE', '%' . $search . '%');
                        });
                    });
            });
        }

        if (!empty($status) && $status == 'pending') {
            $query->where('status', 'pending');
            $query->where('expired_at', '>', Carbon::now()->timestamp);
        } elseif (!empty($status) && $status != 'none') {
            $query->where('status', $status);
        }

        $query = $query->orderBy('created_at', $sort);
        $orders =  $query->paginate(perPage: $perPage);

        return $orders;
    }

    public static function findOne($id)
    {
        return Order::with('productCopy.brand')->find($id);
    }

    public static function count(string $status): int
    {

        if ($status == 'new') {
            $now = Carbon::createFromFormat('Y-m-d H:i:s', Carbon::today());
            $tomorrow = Carbon::createFromFormat('Y-m-d H:i:s', Carbon::today())->addDay();
            $startOfToday = $now->timestamp;
            $startOfTomorrow = $tomorrow->timestamp;

            $total = Order::where('created_at', '>=', $startOfToday)
                ->where('created_at', '<=', $startOfTomorrow)->count();
        } elseif ($status == 'pending') {
            $query = Order::where('status', 'pending');
            $total = $query->where('expired_at', '>', Carbon::now()->timestamp)->count();
        } elseif (!empty($status)) {
            $total = Order::where('status', $status)->count();
        } else {
            $total = Order::count();
        }

        return $total;
    }
}
