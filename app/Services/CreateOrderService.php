<?php

namespace App\Services;

use App\Helpers\JsonResult;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Models\Order;
use App\Models\ProductCopy;
use App\Repositories\OrderCreateRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CreateOrderService
{
    public function create($requestData)
    {

        $productId = $requestData['product_id'];
        $payment = $requestData['payment'];

        // Get product data
        $product = new ProductController();
        $item = $product->findOne($productId);
        if ($item == null) {
            return JsonResult::response(404, "product not found");
        }

        $price = $item->price; // item price

        // charge bank
        $response = PaymentController::bank($price, $payment['bank']);
        $statusCode = $response->status_code;
        $statusMessage = $response->status_message;
        $trxTime = $response->transaction_time;
        $vaNumbers = isset($response->va_numbers) ? $response->va_numbers[0]->va_number : $response->permata_va_number;
        $va = $vaNumbers;
        $expTime = Carbon::createFromFormat('Y-m-d H:i:s', $trxTime, 'Asia/Jakarta')->timestamp + (24 * 60 * 60);
        if (isset($response->expiry_time)) {
            $expTime = Carbon::createFromFormat('Y-m-d H:i:s', $response->expiry_time, 'Asia/Jakarta')->timestamp;
        }

        // check for status code
        if ($statusCode != 201) {
            return JsonResult::response($statusCode, $statusMessage);
        }

        $orderId = $response->order_id;

        // do copy of product
        $lastInsertedProduct = $this->createCopyProduct($item);
        // do insert to order
        $this->createOrder($orderId, $trxTime, $expTime, $va, $lastInsertedProduct, $requestData);

        return $response;
    }

    /**
     * Creates a new copy of a product.
     *
     * @param object $item An object representing the product to be copied.
     * @return int
     */
    protected function createCopyProduct($item)
    {
        $product = new ProductCopy();
        $product->product_id = Carbon::now()->timestamp;
        $product->brand_id = $item->brand_id;
        $product->credit = $item->credit;
        $product->price = $item->price;
        $product->save();

        return $product->id;
    }

    /**
     * Creates a new order in the system.
     *
     * @param string $orderId The ID of the order being created.
     * @param string $trxTime The time of the transaction when the order was placed.
     * @param object $product An object representing the product being ordered.
     * @param int $lastInsertedProduct An object representing the last product that was inserted into the database.
     * @param array $requestData An array of additional data or metadata related to the order.
     * @return void
     */
    protected function createOrder($orderId, $trxTime, $expTime, $va, $lastInsertedProduct, $requestData)
    {
        $phone = $requestData['phone_number'];
        $payment = $requestData['payment'];
        $trxTime = Carbon::createFromFormat('Y-m-d H:i:s', $trxTime, 'Asia/Jakarta')->timestamp;

        OrderCreateRepository::create(
            orderId: $orderId,
            lastInsertedId: $lastInsertedProduct,
            phone: $phone,
            bank: $payment['bank'],
            va: $va,
            trxTime: $trxTime,
            expTime: $expTime
        );
    }
}
