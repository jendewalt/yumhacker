namespace :main do

  desc 'Update updated_at for lists'
  task :update_lists => :environment do

    slugs = [ "coffee-shops-to-be-a-laptop-hobo-from",
              "soma-district-bars-and-clubs",
              "san-francisco-dive-bars-i-m-fond-of",
              "best-coffee-shops-for-a-meeting",
              "my-favorite-cheap-eats-near-south-park-soma",
              "best-coffee-shops-in-the-mission-sf",
              "best-boozy-brunch-in-the-marina",
              "where-to-grab-a-drink-in-san-francisco",
              "top-10-bars-in-san-francisco",
              "best-places-in-the-san-francisco-mission-for-bottomless-mimosas",
              "michelin-star-restaurants-in-san-francisco",
              "top-ten-best-sports-bars-in-san-francisco-soma",
              "best-coffee-shops-to-work-from-in-soma" ].sample(4)

    slugs.each do |slug|
      list = List.where(slug: slug).first
      list.touch unless list.nil?
    end
  end

end
