class Category < ActiveRecord::Base
  default_scope :order => 'categories.name ASC'
  has_many :categorizations, :dependent => :destroy
  has_many :establishments, :through => :categorizations

  extend FriendlyId
  friendly_id :name, use: :slugged
end
