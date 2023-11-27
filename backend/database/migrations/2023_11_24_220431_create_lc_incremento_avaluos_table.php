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
        Schema::create('lc_incremento_avaluos', function (Blueprint $table) {
            $table->id('t_id');
            $table->string('concepto');
            $table->float('incremento');
            $table->integer('vigencia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_incremento_avaluos');
    }
};
