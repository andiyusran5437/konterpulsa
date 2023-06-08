<?php

namespace App\Services;

use App\Repositories\WebhookRepositoy;
use App\Repositories\WhRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class WebhookService
{
    public static function setStatus(array $requestData)
    {
        $status = $requestData['transaction_status'];
        $settlementTimeUnix = null;
        $expiryUnix = null;

        // set settled on status is settlement
        if ($status == 'settlement') {
            $settlementTime = $requestData['settlement_time'];
            $settlementTimeUnix = Carbon::createFromFormat('Y-m-d H:i:s', $settlementTime, 'Asia/Jakarta')->timestamp;
        }
        // set expired time on status pending
        if ($status == 'pending') {
            $expiryTime = $requestData['expiry_time'];
            $expiryUnix = Carbon::createFromFormat('Y-m-d H:i:s', $expiryTime, 'Asia/Jakarta')->timestamp;
        }

        $orderId = $requestData['order_id'];
        Log::info($requestData);

        return WhRepository::setStatus($orderId, $status, $settlementTimeUnix, $expiryUnix);
    }
}
