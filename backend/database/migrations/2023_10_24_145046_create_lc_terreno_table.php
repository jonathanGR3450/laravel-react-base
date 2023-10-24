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
        Schema::create('lc_terreno', function (Blueprint $table) {
            $table->id('t_id');
            $table->decimal('area_terreno', 15, 1);
            $table->decimal('avaluo_terreno', 16, 1)->nullable();
            $table->string('manzana_vereda_codigo', 17)->nullable();
            $table->bigInteger('dimension')->unsigned()->nullable();
            $table->string('etiqueta', 255)->nullable()->nullable();
            $table->bigInteger('relacion_superficie')->unsigned()->nullable();
            $table->bigInteger('nivel')->unsigned()->nullable();
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
        Schema::dropIfExists('lc_terreno');
    }
};
