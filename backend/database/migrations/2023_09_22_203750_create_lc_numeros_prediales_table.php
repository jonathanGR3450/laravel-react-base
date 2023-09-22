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
        Schema::create('lc_numeros_prediales', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->string('numero_predial')->nullable(false);
            $table->boolean('taken')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_numeros_prediales');
    }
};
