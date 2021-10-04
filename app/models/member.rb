class Member < ApplicationRecord
    devise :omniauthable, omniauth_providers: [:google_oauth2]

    def self.from_google(email:, first_name:, last_name:, uid:)
        create_with(email: email, first_name: first_name, last_name: last_name, uid: uid).find_or_create_by!(uid: uid)
    end
end
