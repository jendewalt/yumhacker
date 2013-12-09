class CreateEstablishments < ActiveRecord::Migration
  def change
    create_table :establishments do |t|
      t.text :name
      t.point :latlng, :geographic => true
      t.string :formatted_address
      t.string :street_number
      t.string :street
      t.string :neighborhood
      t.string :city
      t.string :state
      t.string :country
      t.string :zip_code
      t.string :phone
      t.integer :price
      t.string :website
      t.string :google_id
      
      t.timestamps
    end
    add_index :establishments, :name 
    add_index :establishments, :latlng, :spatial => true
    add_index :establishments, :formatted_address
    add_index :establishments, :neighborhood
    add_index :establishments, :price
    add_index :establishments, :google_id, :unique => true
  end
end
