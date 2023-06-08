<?php

namespace App\Helpers;

use Illuminate\Database\Schema\Blueprint;

class TimeStamps
{
    public static function addTimeStamps(Blueprint $table)
    {
        $table->unsignedInteger('created_at')->nullable();
        $table->unsignedInteger('updated_at')->nullable();
        $table->unsignedInteger('deleted_at')->nullable();
    }
}
