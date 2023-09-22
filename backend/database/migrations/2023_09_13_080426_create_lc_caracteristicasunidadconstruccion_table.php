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
        Schema::create('lc_caracteristicasunidadconstruccion', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->string('identificador', 20)->nullable(false);
            $table->bigInteger('tipo_construccion')->nullable();
            $table->bigInteger('tipo_dominio')->nullable();
            $table->bigInteger('tipo_unidad_construccion')->nullable(false);
            $table->bigInteger('tipo_planta')->nullable(false);
            $table->integer('total_habitaciones')->nullable(false);
            $table->integer('total_banios')->nullable(false);
            $table->integer('total_locales')->nullable(false);
            $table->integer('total_plantas')->nullable(false);
            $table->bigInteger('uso')->nullable();
            $table->integer('anio_construccion')->nullable();
            $table->decimal('avaluo_unidad_construccion', 16, 1)->nullable();
            $table->decimal('area_construida', 15, 1)->nullable(false);
            $table->decimal('area_privada_construida', 15, 1)->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamp('comienzo_vida_util_version')->nullable(false);
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255)->nullable(false);
            $table->string('local_id', 255)->nullable(false);
            $table->boolean('sync')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_caracteristicasunidadconstruccion');
    }
};
