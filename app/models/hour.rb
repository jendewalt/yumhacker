class Hour < ActiveRecord::Base
  belongs_to :establishments
  validates :establishment_id, :presence => true
end
