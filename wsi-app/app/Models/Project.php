<?php

namespace App\Models;

use App\Models\Concerns\Localized;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use Localized;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'gallery' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function getCoverUrlAttribute(): ?string
    {
        return $this->cover ? asset('storage/'.$this->cover) : null;
    }
}