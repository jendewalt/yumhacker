class AddEstablishmentNameAndUsernameToComments < ActiveRecord::Migration
  def change
    add_column :comments, :establishment_name, :string
    add_column :comments, :username, :string
    
    add_index :comments, :establishment_name
    add_index :comments, :username
  end
end
