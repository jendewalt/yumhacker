class RenameCollectionsToLists < ActiveRecord::Migration
  def change
    rename_table :collections, :lists
  end
end
