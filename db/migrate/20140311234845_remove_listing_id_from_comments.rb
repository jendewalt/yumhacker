class RemoveListingIdFromComments < ActiveRecord::Migration
  def change
    remove_column :comments, :listing_id, :integer
  end
end
