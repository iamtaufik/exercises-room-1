const { create, index, show, update, destroy } = require('./helpers/crud');

// test create post
create('test title', 'test data');

// test show all post
const allPosts = index();
console.log('All Posts:', allPosts);

// test show detail post by id
console.log(show(1));
// test update post by id
update(2, { title: 'test title update', body: 'test body update' });
console.log(show(2));
// test delete post by id
