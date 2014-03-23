class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :title
      t.text :description
      t.attachment :image
      t.integer :user_id
      t.integer :favoritizations_count, null:false, default: 0
      t.string :type
      
      t.timestamps
    end
    add_index :collections, :created_at
    add_index :collections, :updated_at
    add_index :collections, :user_id
    add_index :collections, :favoritizations_count
    add_index :collections, :type
  end
end
