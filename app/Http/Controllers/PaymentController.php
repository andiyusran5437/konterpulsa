<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{


    public static function bank(int $price, string $bank)
    {
        $key = base64_encode(env('SERVER_KEY') . ':');
        $baseURL = env('PG_URL');
        $chargeURL = $baseURL . "/charge";
        $orderId = time();

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . $key
        ])->post($chargeURL, [
            'payment_type' => 'bank_transfer',
            'transaction_details' => [
                'order_id' =>  $orderId,
                'gross_amount' => $price
            ],
            'bank_transfer' => [
                'bank' => $bank
            ],
            'custom_expiry' => [
                'expiry_duration' => 24 * 60,
                'unit' => 'minute'
            ]
        ]);

        return json_decode($response);
    }
}
