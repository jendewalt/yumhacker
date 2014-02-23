class CreateCategorizations < ActiveRecord::Migration
   def change
    create_table :categorizations do |t|
      t.integer :category_id
      t.integer :establishment_id
      
      t.timestamps
    end
    add_index :categorizations, [:category_id, :establishment_id] 
    add_index :categorizations, [:establishment_id, :category_id] 
  end
end
