<?php
namespace carteauxtresors\model;

class point extends \Illuminate\Database\Eloquent\Model
{
	// Database
	protected $table = 'point';
	protected $primaryKey = 'id';
	
	public $timestamps = false;
}