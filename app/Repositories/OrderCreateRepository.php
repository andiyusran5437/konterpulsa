<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\Log;

class OrderCreateRepository
{
    public static function create($orderId, $lastInsertedId, $phone, $bank, $va, $trxTime, $expTime)
    {
        $order = new Order();
        $order->order_id = $orderId;
        $order->product_copy_id = $lastInsertedId;
        $order->phone_number = $phone;
        $order->bank = $bank;
        $order->va = $va;
        $order->created_at = $trxTime;
        $order->expired_at = $expTime;
        $order->save();
    }
}
