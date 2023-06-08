<?php

namespace App\Helpers;

class JsonResult
{
    public static function response(int $code, string $msg)
    {
        $res = [
            'status_code' => $code,
            'message' => $msg
        ];

        return $res;
    }
}
