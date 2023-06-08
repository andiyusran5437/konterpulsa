<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function auth(Request $req)
    {
        $creds = $req->validate([
            'email' => ['required'],
            'password' => ['required']
        ]);

        if (Auth::attempt($creds)) {
            if (!$req->expectsJson()) {
                $req->session()->regenerate();
            }
            $user = User::where('email', $req->email)->first();
            $token = $user->createToken('token')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token
            ]);
        } else {
            return response()->json([
                'success' => false
            ]);
        }
    }

    public function logout(Request $req)
    {
        Auth::logout();
        if (!$req->expectsJson()) {
            $req->session()->invalidate();
            $req->session()->regenerateToken();
        }
    }
}
