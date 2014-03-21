class Listing < ActiveRecord::Base
  belongs_to :establishment
  belongs_to :list
  has_many :comments, :as => :commentable, :dependent => :destroy

  validates :establishment_id, :presence => true
  validates :list_id, :presence => true
end
