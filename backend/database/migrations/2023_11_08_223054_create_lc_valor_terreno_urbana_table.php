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
        Schema::create('lc_valor_terreno_urbana', function (Blueprint $table) {
            $table->id('t_id');
            $table->string('zhg_no', 8);
            $table->float('valor');
            $table->integer('vigencia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_valor_terreno_urbana');
    }
};
