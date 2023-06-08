<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    protected $model = Brand::class;

    public function definition(): array
    {
        $prefix = [];
        for ($i = 0; $i < 5; $i++) {
            $prefix[] = 0 . fake()->numberBetween(100, 999);
        }

        return [
            'brand_id' => fake()->unixTime(),
            'name' => fake()->company(),
            'prefix' => $prefix,
            'status' => 'active',
            'created_at' => fake()->unixTime(),
        ];
    }
}
