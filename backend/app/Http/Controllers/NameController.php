<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Name;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NameController extends Controller
{
    /**
     * Display all names.
     */
    public function index()
    {
        try {
            $names = Name::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'data' => $names
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve names',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created name.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'full_name' => [
                    'required',
                    'string',
                    'regex:/^[a-zA-Z\s]+$/',
                    'min:2',
                    'max:255'
                ],
                'calculator_result' => [
                    'required',
                    'numeric'
                ]
            ], [
                'full_name.required' => 'Full name is required',
                'full_name.regex' => 'Full name must contain only alphabetic characters and spaces',
                'full_name.min' => 'Full name must be at least 2 characters',
                'full_name.max' => 'Full name must not exceed 255 characters',
                'calculator_result.required' => 'Calculator result is required',
                'calculator_result.numeric' => 'Calculator result must be a number'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $name = Name::create([
                'full_name' => trim($request->full_name),
                'calculator_result' => $request->calculator_result
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Name created successfully',
                'data' => $name
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create name',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specific name.
     */
    public function show(string $id)
    {
        try {
            $name = Name::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $name
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Name not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve name',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specific name.
     */
    public function update(Request $request, string $id)
    {
        try {
            $name = Name::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'full_name' => [
                    'required',
                    'string',
                    'regex:/^[a-zA-Z\s]+$/',
                    'min:2',
                    'max:255'
                ]
            ], [
                'full_name.required' => 'Full name is required',
                'full_name.regex' => 'Full name must contain only alphabetic characters and spaces',
                'full_name.min' => 'Full name must be at least 2 characters',
                'full_name.max' => 'Full name must not exceed 255 characters'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Updates only the full_name and the calculator_result remains unchanged
            $name->full_name = trim($request->full_name);
            $name->save();

            return response()->json([
                'success' => true,
                'message' => 'Name updated successfully',
                'data' => $name
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Name not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update name',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specific name.
     */
    public function destroy(string $id)
    {
        try {
            $name = Name::findOrFail($id);
            $name->delete();

            return response()->json([
                'success' => true,
                'message' => 'Name deleted successfully'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Name not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete name',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
