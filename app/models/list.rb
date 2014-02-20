class List < ActiveRecord::Base
  has_many :listings
  has_many :establishments, :through => :listings
  has_attached_file :avatar, :styles => { :medium => "200x200#", :small => "100x100#", :thumb => "30x30#" }
end
