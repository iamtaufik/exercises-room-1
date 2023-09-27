const { create, index, show, update, destroy } = require("./helpers/crud");

async function main() {
  try {
    test create post
    let newPost = await create("test title", "test data");
    console.log(newPost);

    // test show all posts
    let indexPost = await index();
    console.log(indexPost);

    // test show detail post by id
    let showPost = await show(3);
    console.log(showPost);

    // // test update post by id
    // let updatedPost = await update(1, 'title baru dua');
    // console.log(updatedPost);

    // // test delete post by id
    // let deletedPost = await destroy(1);
    // console.log(deletedPost);
  } catch (err) {
    console.log(err);
  }
}
main();
