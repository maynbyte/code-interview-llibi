<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NameController;

Route::middleware('api')->group(function () {
    Route::get('/names', [NameController::class, 'index']);
    Route::post('/names', [NameController::class, 'store']);
    Route::put('/names/{id}', [NameController::class, 'update']);
    Route::delete('/names/{id}', [NameController::class, 'destroy']);
});
