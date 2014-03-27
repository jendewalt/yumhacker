class AddWebsiteTastemakerAndDescriptionColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :website, :string
    add_column :users, :description, :text
    add_column :users, :tastemaker, :boolean
  end
end
