<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::truncate();
        foreach ($this->data() as $role) {
            Role::create($role);
        }
    }

    function data() : array {
        return [
            ['name' => 'Admin'],
            ['name' => 'Tramitador'],
            ['name' => 'Coordinador'],
            ['name' => 'Juridico'],
        ];
    }
}
