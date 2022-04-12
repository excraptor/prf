Óra eleje:

npm install
npm install mongoose
npm install -g nodemon

nodemon index

docker run -d --name mongo -v $PWD/db:/data/db -p 127.0.0.1:27017:27017 mongo

// Mongo Compass vagy VSC MongoDB bővítmény

connection string: mongodb://localhost:27017