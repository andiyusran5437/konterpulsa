<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCopy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::factory(3)
            ->has(Product::factory()->count(10))
            ->has(
                ProductCopy::factory()
                    ->count(10)
                    ->has(Order::factory())
            )
            ->create();
    }
}
