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
        Schema::create('lc_construccion', function (Blueprint $table) {
            $table->id('t_id');
            $table->string('identificador', 20);
            $table->bigInteger('tipo_construccion')->nullable();
            $table->bigInteger('tipo_dominio')->nullable();
            $table->integer('numero_pisos');
            $table->integer('numero_sotanos')->nullable();
            $table->integer('numero_mezanines')->nullable();
            $table->integer('numero_semisotanos')->nullable();
            $table->integer('anio_construccion')->nullable();
            $table->decimal('avaluo_construccion', 16, 1)->nullable();
            $table->decimal('valor_referencia_construccion', 16, 1)->nullable();
            $table->decimal('area_construccion', 15, 1);
            $table->decimal('altura', 6, 2)->nullable();
            $table->text('observaciones')->nullable();
            $table->bigInteger('dimension')->nullable();
            $table->string('etiqueta', 255)->nullable();
            $table->bigInteger('relacion_superficie')->nullable();
            $table->bigInteger('nivel')->nullable();
            $table->timestamp('comienzo_vida_util_version');
            $table->timestamp('fin_vida_util_version')->nullable();
            $table->string('espacio_de_nombres', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_construccion');
    }
};
