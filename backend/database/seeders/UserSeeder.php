<?php

namespace Database\Seeders;

use App\Domain\Shared\ValueObjects\UlidValueObject;
use App\Infrastructure\Laravel\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=1; $i < 3; $i++) { 
            User::insert($this->data($i));
        }
    }

    public function data(int $count)
    {
        return [
            [
                'id' => UlidValueObject::random(),
                'name' => 'Jonathan',
                'last_name' => 'Garzon',
                'email' => "jonatangarzon+$count@gmail.com",
                'identification' => '1121940890',
                'cell_phone' => '3213860504',
                'city' => 'Villavicencio',
                'address' => 'cll 30 17b',
                'city_register' => 'Villavicencio',
                'is_manager' => true,
                'is_signer' => true,
                'is_verified' => 'id_banlinea',
                'password' => Hash::make('Lol123Lol@'),
            ]
        ];
    }
}
