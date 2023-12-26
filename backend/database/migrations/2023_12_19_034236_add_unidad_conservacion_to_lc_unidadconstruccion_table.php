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
        Schema::table('lc_unidadconstruccion', function (Blueprint $table) {
            $table->string('lc_construccion_conservacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lc_unidadconstruccion', function (Blueprint $table) {
            $table->dropColumn('lc_construccion_conservacion');
        });
    }
};
