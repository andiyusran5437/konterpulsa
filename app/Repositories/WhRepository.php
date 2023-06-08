<?php

namespace App\Repositories;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class WhRepository
{
    public static function setStatus($orderId, $status, $settlementTime, $expiry)
    {
        $updatedTime = Carbon::now()->timestamp;
        $payload = ['status' => $status, 'updated_at' => $updatedTime];
        if ($status === 'settlement') {
            $payload['settlement_time'] = $settlementTime;
        }
        if ($expiry != null) {
            $payload['expired_at'] = $expiry;
        }

        $order = Order::where('order_id', $orderId)
            ->update($payload);

        return $order;
    }
}
