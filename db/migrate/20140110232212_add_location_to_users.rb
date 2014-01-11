class AddLocationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :location, :string
    add_index :users, :location
  end
end
