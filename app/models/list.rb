class List < ActiveRecord::Base
  belongs_to :user
  has_many :listings, :dependent => :destroy
  has_many :establishments, :through => :listings

  has_many :favoritizations
  has_many :favorited_by, :through => :favoritizations, :source => :user

  has_many :imageables, :dependent => :destroy
  has_many :photos, :through => :imageables

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  
  def slug_candidates
      [
        :title,
        [:title, :user],
        # [:title, :street, :city],
      ]
  end

  def imageable_key
    :list_id
  end

  def path
    'lists/' + id.to_s
  end

  def edit_path
    path + '/edit'
  end
end
