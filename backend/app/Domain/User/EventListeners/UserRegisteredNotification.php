<?php

namespace App\Domain\User\EventListeners;

use App\Domain\User\Events\UserRegistered;
use Illuminate\Support\Facades\Mail;

class UserRegisteredNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UserRegistered  $event
     * @return void
     */
    public function handle(UserRegistered $event)
    {
        $event->user->sendEmailUserWasRegistered();
    }
}
