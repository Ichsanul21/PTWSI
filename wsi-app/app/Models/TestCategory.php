<?php

namespace App\Models;

use App\Models\Concerns\Localized;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TestCategory extends Model
{
    use Localized;

    protected $guarded = [];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function tests(): HasMany
    {
        return $this->hasMany(TestItem::class, 'category_id')->orderBy('order');
    }
}