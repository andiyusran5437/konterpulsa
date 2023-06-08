<?php

namespace App\Services;

use App\Repositories\OrderCancelRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderCancelService
{
    public function __construct($id)
    {
        new OrderCancelRepository($id);
    }
}
