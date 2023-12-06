<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            TabViv60UrbanaRuralLocalSeeder::class,
            LcValorTerrenoUrbanaLocalSeeder::class,
            TabSantaMariaDeLosAngelesUrbanaLocalSeeder::class,
            TabBod60UrbanaRuralLocalSeeder::class,
            TabCcF0360UrbanaRuralLocalSeeder::class,
            TabCom60UrbanaRuralLocalSeeder::class,
            TabHot60UrbanaRuralLocalSeeder::class,
            TabAnexosUrbanaRuralLocalSeeder::class,
            LcValorTerrenoRuralLocalSeeder::class,
            RoleSeeder::class,
            AdminUserSeeder::class,
        ]);
    }
}
