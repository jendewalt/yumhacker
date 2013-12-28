json.endorsers @endorsers do |endorser|
    json.id endorser.id
    json.first_name endorser.first_name
    json.last_name endorser.last_name
    json.full_name endorser.first_name + ' ' + endorser.last_name
end