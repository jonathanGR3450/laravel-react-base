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
        Schema::create('lc_numeros_homologados', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->string('numeros_homologados')->nullable(false);
            $table->boolean('taken')->default(false);

            $table->unsignedBigInteger('lc_numeros_prediales_id')->unique()->nullable();
            $table->foreign('lc_numeros_prediales_id')->references('t_id')->on('lc_numeros_prediales')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_numeros_homologados');
    }
};
