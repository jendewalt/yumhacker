class CreateHours < ActiveRecord::Migration
  def change
    create_table :hours do |t|
      t.integer :open_day
      t.integer :close_day
      t.integer :open_time
      t.integer :close_time
      t.integer :establishment_id
      t.integer :open_in_minutes
      t.integer :close_in_minutes

      t.timestamps
    end
    add_index :hours, :establishment_id
    add_index :hours, :open_in_minutes
    add_index :hours, :close_in_minutes
    add_index :hours, [:establishment_id, :open_in_minutes], :unique => true 
    add_index :hours, [:establishment_id, :close_in_minutes], :unique => true
  end
end
