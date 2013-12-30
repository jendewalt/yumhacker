class Establishment < ActiveRecord::Base
  set_rgeo_factory_for_column(:latlng, RGeo::Geographic.spherical_factory(:srid => 4326))

  has_many :endorsements, :dependent => :destroy
  has_many :users, :through => :endorsements
  has_many :hours, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_many :photos, -> { order('created_at DESC') }, :dependent => :destroy
  has_many :preview_photos, -> { order('created_at DESC').limit(4) }, :class_name => 'Photo'

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  def slug_candidates
      [
        :name,
        [:name, :city],
        [:name, :street, :city],
        [:name, :street_number, :street, :city]
      ]
  end

  def self.from_users_followed_by(user)
    joins(:endorsements).group('establishments.id').where(%{endorsements.user_id IN (#{Relationship.select(:followed_id).where(:follower_id => user.id).to_sql}) OR user_id = :user_id}, :user_id => user.id)
  end
end
