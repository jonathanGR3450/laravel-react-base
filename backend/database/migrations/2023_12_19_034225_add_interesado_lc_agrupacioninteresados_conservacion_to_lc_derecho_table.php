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
        Schema::table('lc_derecho', function (Blueprint $table) {
            $table->string('interesado_lc_agrupacioninteresados_conservacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lc_derecho', function (Blueprint $table) {
            $table->dropColumn('interesado_lc_agrupacioninteresados_conservacion');
        });
    }
};
