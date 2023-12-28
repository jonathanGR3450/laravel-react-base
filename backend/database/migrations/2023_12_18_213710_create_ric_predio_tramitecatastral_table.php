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
        Schema::create('ric_predio_tramitecatastral', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('ric_predio')->unsigned()->nullable();
            $table->bigInteger('ric_tramite_catastral')->unsigned()->nullable();

            $table->foreign('ric_predio')->references('t_id')->on('ric_predio')
                ->onDelete('restrict')->onUpdate('cascade');

            $table->foreign('ric_tramite_catastral')->references('t_id')->on('ric_tramitecatastral')
                ->onDelete('restrict')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ric_predio_tramitecatastral');
    }
};
