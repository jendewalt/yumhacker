class List < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :establishments, :through => :listings

  has_many :favoritizations
  has_many :favorited_by, :through => :favoritizations, :source => :user

  has_attached_file :avatar, :styles => { :medium => "200x200#", :small => "100x100#", :thumb => "30x30#" }
end
