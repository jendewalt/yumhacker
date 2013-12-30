class AddSlugToEstablishments < ActiveRecord::Migration
  def change
    add_column :establishments, :slug, :string
    add_index :establishments, :slug, unique: true
  end
end
