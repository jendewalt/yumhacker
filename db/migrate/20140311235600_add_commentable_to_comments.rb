class AddCommentableToComments < ActiveRecord::Migration
  def up
    rename_column :comments, :establishment_id, :commentable_id
    add_column :comments, :commentable_type, :string
    Comment.reset_column_information
    Comment.update_all(:commentable_type => "Establishment")
    add_index :comments, [:commentable_id, :commentable_type] 
  end

  def down
    rename_column :comments, :commentable_id, :establishment_id
    remove_column :comments, :commentable_type
  end
end
