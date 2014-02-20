class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :establishment_id
      t.integer :list_id
    end
    add_index :listings, :establishment_id
    add_index :listings, :list_id
    add_index :listings, [:list_id, :establishment_id], :unique => true
  end
end
