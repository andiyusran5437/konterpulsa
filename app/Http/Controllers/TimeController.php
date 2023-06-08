<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class TimeController extends Controller
{
    public function get()
    {
        return response()->json(Carbon::now()->timestamp);
    }
}
