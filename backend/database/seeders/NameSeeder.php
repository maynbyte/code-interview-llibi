<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Name;

class NameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sampleData = [
            ['full_name' => 'John Doe', 'calculator_result' => 42],
            ['full_name' => 'Jane Smith', 'calculator_result' => 156],
            ['full_name' => 'Michael Johnson', 'calculator_result' => 89],
            ['full_name' => 'Emily Davis', 'calculator_result' => 234],
            ['full_name' => 'Robert Brown', 'calculator_result' => 67]
        ];

        foreach ($sampleData as $data) {
            Name::create($data);
        }
    }
}
