class List < ActiveRecord::Base
  belongs_to :user
  has_many :listings, :dependent => :destroy
  has_many :establishments, :through => :listings

  has_many :favoritizations
  has_many :favorited_by, :through => :favoritizations, :source => :user

  has_many :imageables, :dependent => :destroy
  has_many :photos, :through => :imageables

  validates :title, :presence => true

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  
  def slug_candidates
      [
        :title,
        [user.full_name, :title],
        [user.full_name, user.location, :title],
        [user.full_name, user.location, :title, user.id]
      ]
  end

  def imageable_key
    :list_id
  end

  def path
    'lists/' + slug
  end

  def edit_path
    path + '/edit'
  end

  def should_generate_new_friendly_id?
    title_changed?
  end
end
