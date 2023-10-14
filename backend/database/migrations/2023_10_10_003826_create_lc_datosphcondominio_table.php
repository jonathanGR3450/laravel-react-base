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
        Schema::create('lc_datosphcondominio', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->decimal('area_total_terreno', 16, 2)->nullable(false);
            $table->decimal('area_total_terreno_privada', 16, 2)->nullable(false);
            $table->decimal('area_total_terreno_comun', 16, 2)->nullable(false);
            $table->decimal('area_total_construida', 16, 2)->nullable(false);
            $table->decimal('area_total_construida_privada', 16, 2)->nullable(false);
            $table->decimal('area_total_construida_comun', 16, 2)->nullable(false);
            $table->integer('numero_torres')->nullable(false);
            $table->integer('total_unidades_privadas')->nullable(false);
            $table->bigInteger('lc_predio')->nullable(false);

            $table->foreign('lc_predio')->references('t_id')->on('lc_predio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_datosphcondominio');
    }
};
