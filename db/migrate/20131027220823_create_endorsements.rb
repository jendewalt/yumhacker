class CreateEndorsements < ActiveRecord::Migration
  def change
    create_table :endorsements do |t|
      t.integer :user_id
      t.integer :establishment_id

      t.timestamps
    end
    add_index :endorsements, :user_id
    add_index :endorsements, :establishment_id
    add_index :endorsements, [:user_id, :establishment_id], :unique => true
  end
end
