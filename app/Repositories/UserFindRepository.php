<?php

namespace App\Repositories;

use App\Models\User;

class UserFindRepository
{
    public static function find()
    {
        return User::get()->first();
    }
}
