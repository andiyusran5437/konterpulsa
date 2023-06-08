<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserUpdateRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserUpdateService
{
    public static function update($data)
    {
        UserUpdateRepository::update(data: $data);
    }
}
