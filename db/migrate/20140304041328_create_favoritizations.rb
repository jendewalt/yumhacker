class CreateFavoritizations < ActiveRecord::Migration
  def change
    create_table :favoritizations do |t|
      t.integer :user_id
      t.integer :list_id

      t.timestamps
    end
    add_index :favoritizations, :user_id
    add_index :favoritizations, :list_id
    add_index :favoritizations, [:list_id, :user_id], :unique => true
  end
end
