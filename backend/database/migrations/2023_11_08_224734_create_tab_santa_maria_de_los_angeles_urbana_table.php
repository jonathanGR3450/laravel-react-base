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
        Schema::create('tab_santa_maria_de_los_angeles_urbana', function (Blueprint $table) {
            $table->id('t_id');
            $table->integer('puntos');
            $table->float('valor', 10, 10);
            $table->integer('vigencia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tab_santa_maria_de_los_angeles_urbana');
    }
};
