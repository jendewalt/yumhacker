class Imageable < ActiveRecord::Base
  belongs_to :photo
  belongs_to :list
  belongs_to :establishment

  validates :photo, :presence => true
end
