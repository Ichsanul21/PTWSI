<?php

namespace App\Models;

use App\Models\Concerns\Localized;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Insight extends Model
{
    use Localized;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'is_published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function getCoverUrlAttribute(): ?string
    {
        return $this->cover ? asset('storage/'.$this->cover) : null;
    }
}