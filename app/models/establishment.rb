class Establishment < ActiveRecord::Base
  set_rgeo_factory_for_column(:latlng, RGeo::Geographic.spherical_factory(:srid => 4326))

  has_many :endorsements, :dependent => :destroy
  has_many :users, :through => :endorsements

  def self.from_users_followed_by(user)
    joins(:endorsements).distinct.where(%{endorsements.user_id IN (#{Relationship.select(:followed_id).where(:follower_id => user.id).to_sql}) OR user_id = :user_id}, :user_id => user.id)
  end
end
