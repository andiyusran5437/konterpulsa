<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => fake()->unixTime(),
            'phone_number' => fake()->phoneNumber(),
            'bank' => fake()->company(),
            'va' => fake()->unixTime(),
            'created_at' => fake()->unixTime(),
            'expired_at' => fake()->unixTime()
        ];
    }
}
