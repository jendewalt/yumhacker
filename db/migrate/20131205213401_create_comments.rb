class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :establishment_id
      t.string :body

      t.timestamps
    end
    add_index :comments, :user_id
    add_index :comments, :establishment_id
    add_index :comments, [:user_id, :establishment_id]
  end
end
