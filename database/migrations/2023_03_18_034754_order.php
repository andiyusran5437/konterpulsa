<?php

use App\Helpers\TimeStamps;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_id');
            $table->unsignedBigInteger('product_copy_id');
            $table->string('phone_number');
            $table->foreign('product_copy_id')->references('id')->on('product_copies');
            $table->string('bank');
            $table->string('va');
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('settlement_time')->nullable();
            $table->unsignedBigInteger('expired_at')->nullable();
            TimeStamps::addTimeStamps($table);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
