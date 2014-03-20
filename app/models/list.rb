class List < ActiveRecord::Base
  belongs_to :user
  has_many :listings
  has_many :establishments, :through => :listings

  has_many :favoritizations
  has_many :favorited_by, :through => :favoritizations, :source => :user

  has_many :imageables, :dependent => :destroy
  has_many :photos, :through => :imageables

  def imageable_key
    (self.class.name.downcase + '_id').to_sym
  end
end
