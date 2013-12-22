class CreateAuthentications < ActiveRecord::Migration
  def change
    create_table :authentications do |t|
      t.integer :user_id
      t.string :provider
      t.string :uid
      t.string :token
      t.string :token_secret
      t.datetime "created_at", :null => false
      t.datetime "updated_at", :null => false
    end

    add_index :authentications, :user_id
    add_index :authentications, :uid
  end
end
