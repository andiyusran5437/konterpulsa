<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Carbon::now()->timestamp,
            'credit' => fake()->numberBetween(1000, 8888),
            'price' => fake()->numberBetween(1000, 9999),
            'stock' => fake()->numberBetween(1, 100),
            'status' => 'active',
            'created_at' => fake()->unixTime()
        ];
    }
}
