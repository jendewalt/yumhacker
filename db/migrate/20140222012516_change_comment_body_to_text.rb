class ChangeCommentBodyToText < ActiveRecord::Migration
  def up
    change_column :comments, :body, :text
  end

  def down
    change_column :comments, :body, :string
  end
end
