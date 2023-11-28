<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lc_agrupacioninteresados', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->bigInteger('tipo')->unsigned();
            $table->string('nombre', 255);
            $table->timestamp('comienzo_vida_util_version')->nullable();
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255);
            $table->string('local_id', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_agrupacioninteresados');
    }
};
