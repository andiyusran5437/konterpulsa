<?php

namespace App\Http\Controllers;

use App\Services\UserFindService;
use App\Services\UserUpdateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function update(Request $req)
    {
        $req->validate([
            'pass' => 'min:6'
        ]);

        $data = $req->json()->all();
        return UserUpdateService::update($data);
    }

    public function find()
    {
        return UserFindService::find();
    }
}
