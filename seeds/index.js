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
    for(let i = 0; i < 50; i++){
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new CampGround({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251/1600x900',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti aliquid aut laboriosam, tenetur dolore saepe molestiae, reprehenderit quasi harum quod magnam quos ea dolor ipsum voluptatum porro ab, illo eius?',
            price
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})

