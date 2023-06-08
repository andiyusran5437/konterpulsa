<?php

namespace App\Services;

use App\Repositories\UserFindRepository;

class UserFindService
{
    public static function find()
    {
        return UserFindRepository::find();
    }
}
