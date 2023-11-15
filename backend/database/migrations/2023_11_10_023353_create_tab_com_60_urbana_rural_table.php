<?php

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
        Schema::create('tab_com_60_urbana_rural', function (Blueprint $table) {
            $table->id('t_id');
            $table->integer('puntos');
            $table->float('valor', 10, 10);
            $table->integer('vigencia');
            $table->string('tipo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tab_com_60_urbana_rural');
    }
};
