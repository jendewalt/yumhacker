class AddLastNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :last_name, :string
    add_index :users, :last_name
  end
end
