<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
     protected $fillable = ['chat_session_id', 'role', 'text'];
  public function session()
{
    return $this->belongsTo(ChatSession::class, 'chat_session_id');
}
}
