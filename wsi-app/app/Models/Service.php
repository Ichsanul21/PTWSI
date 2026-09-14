<?php

namespace App\Models;

use App\Models\Concerns\Localized;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use Localized;

    protected $guarded = [];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function testCategories(): HasMany
    {
        return $this->hasMany(TestCategory::class)->orderBy('order');
    }
}