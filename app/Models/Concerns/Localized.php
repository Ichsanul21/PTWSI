<?php

namespace App\Models\Concerns;

trait Localized
{
    public function lt(string $field): string
    {
        return (string) $this->{"{$field}_".app()->getLocale()};
    }

    public function localized(string $field): string
    {
        return $this->lt($field);
    }
}