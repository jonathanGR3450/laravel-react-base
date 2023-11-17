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
        Schema::create('col_uebaunit', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('ue_lc_unidadconstruccion')->nullable();
            $table->bigInteger('ue_lc_construccion')->nullable();
            $table->bigInteger('ue_lc_terreno')->nullable();
            $table->bigInteger('baunit');

            $table->foreign('baunit')->references('t_id')->on('lc_predio')->deferrable()->initiallyDeferred();
            $table->foreign('ue_lc_construccion')->references('t_id')->on('lc_construccion')->deferrable()->initiallyDeferred();
            $table->foreign('ue_lc_terreno')->references('t_id')->on('lc_terreno')->deferrable()->initiallyDeferred();
            $table->foreign('ue_lc_unidadconstruccion')->references('t_id')->on('lc_unidadconstruccion')->deferrable()->initiallyDeferred();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('col_uebaunit');
    }
};
