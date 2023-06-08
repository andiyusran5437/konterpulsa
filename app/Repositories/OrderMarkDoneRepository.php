<?php

namespace App\Repositories;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class OrderMarkDoneRepository
{
    public static function markDone($id)
    {
        $order = Order::find($id);
        $order->status = 'succeed';
        $order->updated_at = Carbon::now()->timestamp;
        $order->save();
    }
}
