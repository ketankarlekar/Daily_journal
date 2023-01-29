
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const _ = require("lodash")

let  posts = [];


const homeContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, blanditiis illo distinctio nam quasi dolorem est deleniti itaque id repudiandae dicta magni ullam rerum facere cum natus ea eligendi eum et? Dolores consequuntur voluptatum ut illo aliquid odit adipisci facere fugit temporibus reiciendis, nisi corporis, eligendi, consectetur aliquam commodi non sequi in deleniti qui. Repellat exercitationem eius perspiciatis maxime vel delectus ipsum quasi voluptate officia veniam, deleniti a autem deserunt sit beatae fuga consectetur! Dolorum laboriosam soluta dignissimos iure laborum id accusantium, aliquam fugit quidem officia facilis, voluptatibus, harum adipisci! Impedit atque quis provident reprehenderit voluptatem minus expedita vero rerum.";

const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, blanditiis illo distinctio nam quasi dolorem est deleniti itaque id repudiandae dicta magni ullam rerum facere cum natus ea eligendi eum et? Dolores consequuntur voluptatum ut illo aliquid odit adipisci facere fugit temporibus reiciendis, nisi corporis, eligendi, consectetur aliquam commodi non sequi in deleniti qui. Repellat exercitationem eius perspiciatis maxime vel delectus ipsum quasi voluptate officia veniam, deleniti a autem deserunt sit beatae fuga consectetur! Dolorum laboriosam soluta dignissimos iure laborum id accusantium, aliquam fugit quidem officia facilis, voluptatibus, harum adipisci! Impedit atque quis provident reprehenderit voluptatem minus expedita vero rerum.";

const contactContent =
  "you can contact me Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, blanditiis illo distinctio nam quasi dolorem est deleniti itaque id repudiandae dicta magni ullam rerum facere cum natus ea eligendi eum et? Dolores consequuntur voluptatum ut illo aliquid odit adipisci facere fugit temporibus reiciendis, nisi corporis, eligendi, consectetur aliquam commodi non sequi in deleniti qui. Repellat exercitationem eius perspiciatis maxime vel delectus ipsum quasi voluptate officia veniam, deleniti a autem deserunt sit beatae fuga consectetur! Dolorum laboriosam soluta dignissimos iure laborum id accusantium, aliquam fugit quidem officia facilis, voluptatibus, harum adipisci! Impedit atque quis provident reprehenderit voluptatem minus expedita vero rerum.";

const app = express();
const router = express.Router();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

router.get("/", function (req, res) {
  res.render("home", {
    homeContent: homeContent,
    posts: posts
  });
 
});

app.use("/", router);

router.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
router.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});
router.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.blogPost
    
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/post/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
   
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title : post.title,
        content : post.content
      });
    }
   
    
  });


});


app.listen(3900, function () {
  console.log("Server started on port 3900.");
});


