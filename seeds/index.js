const mongoose = require('mongoose');
const CampGround = require('../models/campground');
const {places,descriptors} = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () =>{
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async() => {
    await CampGround.deleteMany({});
    for(let i = 0; i < 200; i++){
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new CampGround({
            author: '611d30b65fd5c4331c87c9c0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti aliquid aut laboriosam, tenetur dolore saepe molestiae, reprehenderit quasi harum quod magnam quos ea dolor ipsum voluptatum porro ab, illo eius?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dspx5wwiu/image/upload/v1629715205/Yelp-Camp/gmnsekwnhw8mwmhihnrq.jpg',
                  filename: 'Yelp-Camp/gmnsekwnhw8mwmhihnrq'
                },
                {
                  url: 'https://res.cloudinary.com/dspx5wwiu/image/upload/v1629715206/Yelp-Camp/vpkt5ylolgu4l1qe4eex.jpg',
                  filename: 'Yelp-Camp/vpkt5ylolgu4l1qe4eex'
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})

