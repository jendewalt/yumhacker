class AddImageableToPhotos < ActiveRecord::Migration
  def up
      rename_column :photos, :establishment_id, :imageable_id
      add_column :photos, :imageable_type, :string
      add_index :photos, [:imageable_id, :imageable_type] 
      Photo.reset_column_information
      Photo.update_all(:imageable_type => "Establishment")
    end

    def down
      rename_column :photos, :imageable_id, :establishment_id
      remove_column :photos, :imageable_type
    end
end
