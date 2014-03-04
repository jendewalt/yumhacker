class Favoritization < ActiveRecord::Base
  belongs_to :user
  belongs_to :list

  validates :user_id, :presence => true
  validates :list_id, :presence => true
end
