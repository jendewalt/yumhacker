class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title
      t.text :description
      t.attachment :image
      t.boolean :wish_list
      t.integer :user_id
    end
    add_index :lists, :wish_list
  end
end
