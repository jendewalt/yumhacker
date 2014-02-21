class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title
      t.text :description
      t.attachment :image
      t.boolean :wish_list
      t.integer :user_id

      t.timestamps
    end
    add_index :lists, :wish_list
    add_index :lists, :created_at
    add_index :lists, :updated_at
  end
end
