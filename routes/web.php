<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/order-list', function () {
    return view('welcome');
});

// admin
Route::middleware('auth:sanctum')->get('/admin', function () {
    return view('welcome');
});

Route::middleware('auth:sanctum')->get('/admin/orders', function () {
    return view('welcome');
});

Route::middleware('auth:sanctum')->get('/admin/products', function () {
    return view('welcome');
});

Route::middleware('auth:sanctum')->get('/admin/brands', function () {
    return view('welcome');
});

Route::get('/auth', function () {
    return view('welcome');
})->name('login');
