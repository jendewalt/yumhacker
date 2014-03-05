class AddFavoritesCountToLists < ActiveRecord::Migration
  def self.up
    add_column :lists, :favoritizations_count, :integer, null:false, default: 0
  end
  def self.down
    remove_column :lists, :favoritizations_count
  end
end
