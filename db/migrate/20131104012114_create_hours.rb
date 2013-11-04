class CreateHours < ActiveRecord::Migration
  def change
    create_table :hours do |t|
      t.string :event_type
      t.integer :day
      t.integer :time
      t.integer :establishment_id

      t.timestamps
    end
    add_index :hours, :establishment_id
  end
end
