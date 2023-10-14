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
        Schema::create('col_miembros', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->bigInteger('interesado_lc_interesado')->unsigned();
            $table->bigInteger('interesado_lc_agrupacioninteresados')->unsigned();
            $table->bigInteger('agrupacion')->unsigned();
            $table->decimal('participacion', 11, 10);

            $table->foreign('interesado_lc_interesado')->references('t_id')->on('lc_interesado');
            $table->foreign('interesado_lc_agrupacioninteresados')->references('t_id')->on('lc_agrupacioninteresados');
            $table->foreign('agrupacion')->references('t_id')->on('lc_agrupacioninteresados');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('col_miembros');
    }
};
