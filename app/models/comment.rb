class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :establishment

  validates :user, :presence => true
  validates :establishment, :presence => true
  validates :body, :presence => true, length: { maximum: 255 }
end
