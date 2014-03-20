class CreateImageables < ActiveRecord::Migration
  def change
    create_table :imageables do |t|
      t.integer :photo_id
      t.integer :establishment_id
      t.integer :list_id

      t.timestamps
    end

    Photo.all.each do |photo|
      imageable = Imageable.new(establishment_id: photo.establishment_id, photo_id: photo.id)
      imageable.save
    end
    
    add_index :imageables, :photo_id
    add_index :imageables, :establishment_id
    add_index :imageables, :list_id
    add_index :imageables, [:photo_id, :establishment_id], :unique => true
    add_index :imageables, [:photo_id, :list_id], :unique => true
  end
end
