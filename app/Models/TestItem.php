<?php

namespace App\Models;

use App\Models\Concerns\Localized;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestItem extends Model
{
    use Localized;

    protected $guarded = [];

    protected function casts(): array
    {
        return ['standards' => 'array'];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(TestCategory::class, 'category_id');
    }
}