class AddTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :token, :string
    add_index :users, :token
  end
end
