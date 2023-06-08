<?php

namespace App\Repositories;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class OrderCancelRepository
{
    public function __construct($orderId)
    {
        $order = Order::find($orderId);
        $order->status = 'cancel';
        $order->updated_at = Carbon::now()->timestamp;
        $order->save();
    }
}
