class AddListingIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :listing_id, :integer
    add_index :comments, :listing_id, :unique => true
  end
end
