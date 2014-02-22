class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :establishment
  belongs_to :listing

  validates :user, :presence => true
  validates :establishment, :presence => true
  validates :body, :presence => true
end
