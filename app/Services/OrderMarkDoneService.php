<?php

namespace App\Services;

use App\Repositories\OrderMarkDoneRepository;

class OrderMarkDoneService
{
    public static function markDone($id)
    {
        OrderMarkDoneRepository::markDone($id);
    }
}
