json.id @establishment.id
json.name @establishment.name
json.path @establishment.path

json.user_endorsing current_user ? current_user.endorsing?(@establishment) : false