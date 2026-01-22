<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Name extends Model
{
    protected $fillable = [
        'full_name',
        'calculator_result'
    ];

    protected $casts = [
        'calculator_result' => 'integer'
    ];
}
