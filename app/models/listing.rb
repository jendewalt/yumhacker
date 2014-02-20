class Listing < ActiveRecord::Base
  belongs_to :establishment
  belongs_to :list

  validates :establishment_id, :presence => true
  validates :list_id, :presence => true
end
