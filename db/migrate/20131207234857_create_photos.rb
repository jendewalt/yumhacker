class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.attachment :image
      t.string :caption
      t.integer :user_id
      t.integer :establishment_id
    end
    add_index :photos, :user_id
    add_index :photos, :establishment_id
    add_index :photos, [:user_id, :establishment_id]
  end
end
