select users.first_name, users.latitude, users.longitude, users.current_mtn, friends.friend_id, users.profile_picture, users.location_visible  from users 
join friends on friends.friend_id = users.user_id
where current_mtn = $1 and friends.f_user_id = $2;