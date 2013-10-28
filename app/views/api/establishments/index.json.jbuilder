json.establishments @establishments do |establishment|
	json.id establishment.id
	json.name establishment.name
	json.formatted_address establishment.formatted_address
end
