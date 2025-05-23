<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    protected $fillable = [
        'user_id', 
        'prompt',
    ];
    public function messages()
{
    return $this->hasMany(ChatMessage::class);
}
}
