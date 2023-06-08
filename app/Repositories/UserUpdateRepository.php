<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserUpdateRepository
{
    public static function update($data)
    {
        $name  = isset($data['name']) ? $data['name'] : null;
        $email  = isset($data['email']) ? $data['email'] : null;
        $pass  = isset($data['password']) ? $data['password'] : null;
        $id = Auth::user()->id;

        $user = User::find($id);
        if ($name != null) {
            $user->name = $name;
        }
        if ($email != null) {
            $user->email = $email;
        }
        if ($pass != null) {
            $user->password = Hash::make($pass, ['rounds' => 12]);
        }
        Log::info($data);

        return $user->save();
    }
}
