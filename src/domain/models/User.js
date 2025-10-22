class User {
    constructor(name, gender, location, email, dob, picture) {
        this.name = name;
        this.gender = gender;
        this.location = location;
        this.email = email;
        this.dob = dob;
        this.picture = picture;
    }

    static fromApiResponse(user) {
        return new User(
            `${user.name.first} ${user.name.last}`,
            user.gender,
            `${user.location.city}, ${user.location.state}, ${user.location.country}`,
            user.email,
            user.dob.date,
            user.picture.large
        );
    }
}

module.exports = User;