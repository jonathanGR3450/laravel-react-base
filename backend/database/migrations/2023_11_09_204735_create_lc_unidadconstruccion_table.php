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
        Schema::create('lc_unidadconstruccion', function (Blueprint $table) {
            $table->id('t_id');
            $table->integer('planta_ubicacion');
            $table->decimal('area_construida', 15, 1);
            $table->integer('altura')->nullable();
            $table->bigInteger('lc_caracteristicasunidadconstruccion');
            $table->bigInteger('lc_construccion');
            $table->bigInteger('dimension')->nullable();
            $table->string('etiqueta', 255)->nullable();
            $table->bigInteger('relacion_superficie')->nullable();
            $table->bigInteger('nivel')->nullable();
            $table->timestamp('comienzo_vida_util_version')->nullable();
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255);
            $table->string('local_id', 255);

            // Constraints
            $table->foreign('lc_caracteristicasunidadconstruccion')->references('t_id')->on('lc_caracteristicasunidadconstruccion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_unidadconstruccion');
    }
};
