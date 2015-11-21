<?php
class MY_Model extends CI_Model
{
  protected $db_table;
  protected $db_table_pk;
  /*
   * Create Record.
   */
  private function insert()
  {
    $this->db->insert($this->db_table, $this);
    $this->{$this->db_table_pk} = $this->db->insert_id();
  }
  
  /*
   * Update Record
   */
  private function update()
  {
		$this->db->update($this->db_table, $this, array($this->db_table_pk => $this->{$this->db_table_pk}));
  }
  
  /*
   * Populate from an array or standard class.
   * @param mixed $row
   */
  public function populate($row)
  {
    foreach($row as $key => $value)
    {
      $this->$key = $value;
    }
  }
  
  /*
   * Load from the Database.
   * @param int $id
   */
  public function load($id)
  {
    $query = $this->db->get_where($this->db_table, array(
        $this->db_table_pk => $id,
    ));
    
    $this->populate($query->row());
  }
  
  /*
   * Delete the current record.
   */
  public function delete()
  {
    $this->db->delete($this->db_table, array(
      $this->db_table_pk => $this->{$this->db_table_pk},
    ));
    
    unset($this->{$this->db_table_pk});
  }
  
  /*
   * Save the Record
   */
  public function save()
  {
    if(isset($this->{$this->db_table_pk}))
    {
      $this->update();
    }
    else
    {
      $this->insert();
    }
  }
  
  /*
   * Get an array of models with and optional limit, offset.
   * 
   * @param int $limit Optional.
   * @param int $offset Optional, requires limit.
   * Return array models populated by database, keyed by PK
   */
  
  public function get($limit = 0, $offset = 0)
  {
    if($limit)
    {
      $query = $this->db->get($this->db_table, $limit, $offset);
    }
    else
    {
      $query = $this->db->get($this->db_table);
    }
    $ret_val = array();
    $class = get_class($this);
    foreach($query->result() as $row)
    {
      $model = new $class;
      $model->populate($row);
      $ret_val[$row->{$this->db_table_pk}] = $model;
    }
    return $ret_val;
  }
}
?>