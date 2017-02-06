<?php
namespace carteauxtresors\model;

class partie extends \Illuminate\Database\Eloquent\Model
{
	// Database
	protected $table = 'partie';
	protected $primaryKey = 'id';
	
	public $timestamps = false;
}