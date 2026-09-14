<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('test_categories')->cascadeOnDelete();
            $table->string('name_id');
            $table->string('name_en')->nullable();
            $table->string('slug')->unique();
            $table->json('standards')->nullable();
            $table->text('description_id')->nullable();
            $table->text('description_en')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('test_items');
    }
};