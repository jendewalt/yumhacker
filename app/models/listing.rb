class Listing < ActiveRecord::Base
  belongs_to :establishment
  belongs_to :list
  has_one :comment

  validates :establishment_id, :presence => true
  validates :list_id, :presence => true
end
