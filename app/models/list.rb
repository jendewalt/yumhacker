class List < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :establishments, :through => :listings

  has_many :favoritizations
  has_many :favorited_by, :through => :favoritizations, :source => :user

  has_many :photos, :as => :imageable, :dependent => :destroy
end
