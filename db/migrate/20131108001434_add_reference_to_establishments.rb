class AddReferenceToEstablishments < ActiveRecord::Migration
  def change
    add_column :establishments, :google_id, :string
    add_index :establishments, :google_id, :unique => true
  end
end
