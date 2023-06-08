<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TimeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/orders', [OrderController::class, 'find']);
Route::post('/orders', [OrderController::class, 'create']);
Route::get('/orders/{id}/cancel', [OrderController::class, 'cancel']);

// Product routes
Route::get('/products', [ProductController::class, 'find']);

// protected rotue
Route::middleware('auth:sanctum')->group(function () {
    // orders
    Route::get('/orders/count', [OrderController::class, 'count']);
    Route::get('/orders/{id}', [OrderController::class, 'findOne']);
    Route::get('/orders/{id}/done', [OrderController::class, 'markDone']);

    // Product
    Route::post('/products', [ProductController::class, 'create']);
    Route::get('/products/{id}', [ProductController::class, 'findOne']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::put('/products/{id}/status', [ProductController::class, 'statusUpdate']);
    Route::delete('/products/{id}', [ProductController::class, 'delete']);
    Route::delete('/products/{id}/soft', [ProductController::class, 'softDelete']);

    // Brand
    Route::get('/brands', [BrandController::class, 'find']);
    Route::post('/brands', [BrandController::class, 'create']);
    Route::put('/brands/{id}', [BrandController::class, 'update']);
    Route::put('/brands/{id}/status', [BrandController::class, 'statusUpdate']);
    Route::delete('/brands/{id}', [BrandController::class, 'delete']);
    Route::delete('/brands/{id}/soft', [BrandController::class, 'softDelete']);

    // User
    Route::get('/users', [UserController::class, 'find'])->middleware(['auth:sanctum']);
    Route::put('/users', [UserController::class, 'update'])->middleware(['auth:sanctum']);
    Route::get('/logout', [AuthController::class, 'logout']);
});

// Webhook
Route::post('/status', [WebhookController::class, 'setStatus']);

// Time
Route::get('/server-time', [TimeController::class, 'get']);

// Auth
Route::post('/auth', [AuthController::class, 'auth']);
