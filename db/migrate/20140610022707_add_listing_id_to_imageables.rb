class AddListingIdToImageables < ActiveRecord::Migration
  def change
    add_column :imageables, :listing_id, :integer
    add_index :imageables, :listing_id
  end
end
